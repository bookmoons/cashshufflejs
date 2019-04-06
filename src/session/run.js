import bitcore from 'bitcore-lib-cash'
import {
  InadequateError,
  MissingValueError,
  NotImplementedError,
  ValueError
} from '/error'
import { hexToBytes } from '/aid/convert'
import { Phase } from '/protocol'
import { defaultAttempts, defaultNetwork, defaultTimeout } from './default'

/**
 * @typedef {object} RunParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition. Not modified.
 * @prop {number} [attempts=<default>] - Maximum gather attempts.
 *     Positive integer.
 * @prop {number} [timeout=<default>] - Network operation timeout
 *     in milliseconds.
 * @prop {Uint8Array} sessionId - Session identifier. Not modified.
 * @prop {number} poolNumber - Shuffler pool number.
 * @prop {Signing} signingKeyPair - Shuffler signing key pair.
 *     Assumed ready for use.
 * @prop {Iterable<HexString>} shufflers - Shuffler signing public keys.
 *     Will be deduplicated and ordered lexicographically by address.
 * @prop {Map<HexString-Address>} changeAddresses - Change addresses.
 *     Key shuffler signing public key. Value change address. Not modified.
 * @prop {number} amount - Amount to shuffle in satoshis.
 * @prop {number} fee - Shuffler fee amount in satoshis.
 *     The produced transaction will charge this fee to each shuffler.
 * @prop {Coin} coin - Bitcoin Cash network interface.
 * @prop {Outchan} outchan - Output message channel.
 * @prop {SessionReceiver} receiver - Session message receiver.
 * @prop {Receiver} [discarder=] - Receiver to discard messages to.
 * @prop {Logchan} [log=] - Logging channel.
 * @prop {bitcore.Network} [network=<mainnet>] - Bitcoin Cash network.
 *     Not modified.
 * @prop {Address} [outputAddress=] - Own output address.
 *     Defaults to a newly generated key pair.
 */

/**
 * @typedef {object} RunReturn
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {Signing} outputKeyPair - Own output key pair.
 * @prop {module:cashshuffle/coin~Transaction} transaction - The submitted
 *     Bitcoin Cash transaction.
 */

/**
 * @memberof module:cashshuffle/session.Session
 *
 * @param {RunParams} params
 *
 * @return {RunReturn}
 *
 * @throws {NotImplementedError} For any event that should enter blame phase.
 *     Message `'blame'`.
 * @throws {MissingValueError} If shufflers list does not contain
 *     own signing public key. Message `'own key in shufflers list'`.
 */
async function run ({
  protocol,
  attempts = defaultAttempts,
  timeout = defaultTimeout,
  sessionId,
  poolNumber,
  signingKeyPair,
  shufflers,
  changeAddresses,
  amount,
  fee,
  coin,
  outchan,
  receiver,
  discarder = null,
  log = null,
  network = defaultNetwork,
  outputAddress = null
}) {
  // Order shufflers
  const shufflersOrdered = await this.orderShufflers(shufflers)

  // Shuffler variables
  const signingPublicKey = await signingKeyPair.exportPublicKey()
  const ownShufflerIndex = shufflersOrdered.indexOf(signingPublicKey)
  if (ownShufflerIndex === -1) {
    throw new MissingValueError(
      { info: { signingPublicKey } },
      'own key in shufflers list'
    )
  }
  const precedingShufflersCount = ownShufflerIndex
  const first = (ownShufflerIndex === 0)
  const shufflersCount = shufflersOrdered.length
  const lastShufflerIndex = shufflersCount - 1
  const last = (ownShufflerIndex === lastShufflerIndex)
  const priorShufflerIndex = first ? null : ownShufflerIndex - 1
  const priorShufflerHex =
    first ? null : shufflersOrdered[priorShufflerIndex]
  const priorShuffler = first ? null : hexToBytes(priorShufflerHex)
  const nextShufflerIndex = last ? null : ownShufflerIndex + 1
  const nextShuffler =
    last ? null : shufflersOrdered[nextShufflerIndex]
  const lastShufflerHex =
    last ? signingPublicKey : shufflersOrdered[lastShufflerIndex]
  const lastShuffler = hexToBytes(lastShufflerHex)
  if (log) {
    const message = 'Shuffling with ' + shufflersCount + ' shufflers'
    await log.send(message)
  }

  // Stage phase receivers
  const phaseReceivers = receiver.phaseReceivers

  /* Phase 1: Announce. */
  const announcePhaseIdentifier = Phase.Announcement.value
  const announceReceiver = phaseReceivers.get(announcePhaseIdentifier)
  const announcePromise = this.announce({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber,
    signingKeyPair,
    amount,
    fee,
    coin,
    outchan,
    receiver: announceReceiver,
    discarder,
    log,
    network
  })
  try {
    await announcePromise
  } catch (e) {
    if (
      e instanceof InadequateError &&
      e.message === 'insufficient funds'
    ) {
      throw new NotImplementedError(e, 'blame')
    } else throw e
  }
  const { encryptionKeyPair, encryptionPublicKeys } = await announcePromise
  if (log) await log.send('Phase 1 Announce complete')

  // Prepare ordered encryption public keys
  const encryptionPublicKeysOrdered = []
  const ownEncryptionPublicKey = await encryptionKeyPair.exportPublicKey()
  for (const shuffler of shufflersOrdered) {
    const encryptionPublicKey =
      shuffler === signingPublicKey
        ? ownEncryptionPublicKey
        : encryptionPublicKeys.get(shuffler)
    encryptionPublicKeysOrdered.push(encryptionPublicKey)
  }

  // Prepare subsequent shuffler encryption public keys
  const subsequentEncryptionPublicKeys =
    last ? [] : encryptionPublicKeysOrdered.slice(nextShufflerIndex)

  /* Phase 2: Shuffle. */
  const shufflePhaseIdentifier = Phase.Shuffle.value
  const shuffleReceiver = phaseReceivers.get(shufflePhaseIdentifier)
  const shufflePromise = this.shuffle({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber,
    signingKeyPair,
    first,
    last,
    precedingShufflersCount,
    priorShuffler,
    nextShuffler,
    encryptionPublicKeys: subsequentEncryptionPublicKeys,
    crypto: encryptionKeyPair,
    outchan,
    receiver: shuffleReceiver,
    discarder,
    log,
    network
  })
  try {
    await shufflePromise
  } catch (e) {
    const blameMessages = [
      'decryption failure',
      'output list duplicates'
    ]
    if (
      e instanceof ValueError &&
      blameMessages.includes(e.message)
    ) {
      throw new NotImplementedError(e, 'blame')
    } else throw e
  }
  const { outputKeyPair } = await shufflePromise
  if (log) await log.send('Phase 2 Shuffle complete')

  /* Phase 3: Broadcast Output. */
  const outputPhaseIdentifier = Phase.Broadcast.value
  const outputReceiver = phaseReceivers.get(outputPhaseIdentifier)
  if (!outputAddress) outputAddress = await outputKeyPair.address()
  const outputPromise = this.broadcastOutput({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber,
    signingKeyPair,
    last,
    shufflersCount,
    precedingShufflersCount,
    priorShuffler,
    lastShuffler,
    outputAddress,
    crypto: encryptionKeyPair,
    outchan,
    receiver: outputReceiver,
    priorReceiver: shuffleReceiver,
    discarder,
    log
  })
  try {
    await outputPromise
  } catch (e) {
    const blameMessages = [
      'decryption failure',
      'output list duplicates',
      'output missing'
    ]
    if (
      e instanceof ValueError &&
      blameMessages.includes(e.message)
    ) {
      throw new NotImplementedError(e, 'blame')
    } else throw e
  }
  const { outputList } = await outputPromise
  if (log) await log.send('Phase 3 Broadcast Output complete')

  // Prepare hash encryption public keys
  const hashEncryptionPublicKeys = encryptionPublicKeysOrdered.slice(1)

  /* Phase 4: Check Equivocation. */
  const equivocationPhaseIdentifier = Phase.EquivocationCheck.value
  const equivocationReceiver = phaseReceivers.get(equivocationPhaseIdentifier)
  const checkEquivocationPromise = this.checkEquivocation({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber,
    signingKeyPair,
    encryptionPublicKeys: hashEncryptionPublicKeys,
    outputList,
    crypto: encryptionKeyPair,
    outchan,
    receiver: equivocationReceiver,
    discarder,
    log
  })
  try {
    await checkEquivocationPromise
  } catch (e) {
    if (
      e instanceof ValueError &&
      e.message === 'equivocation'
    ) {
      throw new NotImplementedError(e, 'blame')
    } else throw e
  }
  if (log) await log.send('Phase 4 Equivocation Check complete')

  // Prepare input addresses
  const inputAddresses = new Map()
  for (const publicKeyString of shufflersOrdered) {
    const publicKey = new bitcore.PublicKey(publicKeyString, { network })
    const address = new bitcore.Address(publicKey, network)
    const addressString = address.toCashAddress()
    inputAddresses.set(publicKeyString, addressString)
  }

  /* Phase 5: Submit. */
  const submitPhaseIdentifier = Phase.VerificationSubmission.value
  const submitReceiver = phaseReceivers.get(submitPhaseIdentifier)
  const submitPromise = this.submit({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber,
    signingKeyPair,
    amount,
    fee,
    inputAddresses,
    outputAddresses: outputList,
    changeAddresses,
    coin,
    outchan,
    receiver: submitReceiver,
    discarder,
    log,
    network
  })
  try {
    await submitPromise
  } catch (e) {
    if (
      (e instanceof ValueError && e.message === 'invalid signature') ||
      (e instanceof InadequateError && e.message === 'insufficient funds')
    ) {
      throw new NotImplementedError(e, 'blame')
    } else throw e
  }
  const { transaction } = await submitPromise
  if (log) await log.send('Phase 5 Submit Transaction complete')

  /* Return result. */
  return {
    outputKeyPair,
    transaction
  }
}

export default run
