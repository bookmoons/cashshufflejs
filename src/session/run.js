import bitcore from 'bitcore-lib-cash'
import {
  InadequateError,
  MissingValueError,
  NotImplementedError,
  ValueError
} from '../error'
import { Phase } from '../protocol'
import { defaultAttempts, defaultNetwork, defaultTimeout } from './default'

/**
 * @typedef {object} RunParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition.
 * @prop {number} [attempts=<default>] - Maximum gather attempts.
 *     Positive integer.
 * @prop {number} [timeout=<default>] - Network operation timeout
 *     in milliseconds.
 * @prop {ArrayBuffer} sessionId - Session identifier.
 * @prop {number} poolNumber - Participant pool number.
 * @prop {Signing} signingKeyPair - Participant signing key pair.
 *     Assumed ready for use.
 * @prop {Iterable<HexString>} participants - Participant signing public keys.
 *     Will be deduplicated and ordered lexicographically by address.
 * @prop {Map<HexString-CashAddr>} changeAddresses - Change addresses.
 *     Key participant signing public key. Value change address.
 * @prop {number} amount - Amount to shuffle in satoshis.
 * @prop {number} fee - Participant fee amount in satoshis.
 *     The produced transaction will charge this fee to each participant.
 * @prop {Coin} coin - Bitcoin Cash network interface.
 * @prop {Outchan} outchan - Output message channel.
 * @prop {SessionReceiver} receiver - Session message receiver.
 * @prop {Receiver} [discarder=null] - Receiver to discard messages to.
 * @prop {Logchan} [log=null] - Logging channel.
 * @prop {bitcore.Network} [network=<mainnet>] - Bitcoin Cash network.
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
 * @throws {MissingValueError} If participants list does not contain
 *     own signing public key. Message `'own key in participants list'`.
 */
async function run ({
  protocol,
  attempts = defaultAttempts,
  timeout = defaultTimeout,
  sessionId,
  poolNumber,
  signingKeyPair,
  participants,
  changeAddresses,
  amount,
  fee,
  coin,
  outchan,
  receiver,
  discarder = null,
  log = null,
  network = defaultNetwork
}) {
  // Order participants
  const participantsOrdered = await this.orderParticipants(participants)

  // Participant variables
  const signingPublicKey = await signingKeyPair.exportPublicKey()
  const ownParticipantIndex = participantsOrdered.indexOf(signingPublicKey)
  if (ownParticipantIndex === -1) {
    throw new MissingValueError(
      { info: { signingPublicKey } },
      'own key in participants list'
    )
  }
  const first = (ownParticipantIndex === 0)
  const participantsCount = participantsOrdered.length
  const lastParticipantIndex = participantsCount - 1
  const last = (ownParticipantIndex === lastParticipantIndex)
  const priorParticipantIndex = first ? null : ownParticipantIndex - 1
  const priorParticipant =
    first ? null : participantsOrdered[priorParticipantIndex]
  const nextParticipantIndex = last ? null : ownParticipantIndex + 1
  const nextParticipant =
    last ? null : participantsOrdered[nextParticipantIndex]
  const lastParticipant =
    last ? signingPublicKey : participantsOrdered[lastParticipantIndex]
  if (log) {
    const message = 'Shuffling with ' + participantsCount + ' participants'
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
  for (const participant of participantsOrdered) {
    const encryptionPublicKey =
      participant === signingPublicKey
        ? ownEncryptionPublicKey
        : encryptionPublicKeys.get(participant)
    encryptionPublicKeysOrdered.push(encryptionPublicKey)
  }

  // Prepare subsequent participant encryption public keys
  const subsequentEncryptionPublicKeys =
    last ? [] : encryptionPublicKeysOrdered.slice(nextParticipantIndex)

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
    priorParticipant,
    nextParticipant,
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
  const outputAddress = await outputKeyPair.address()
  const outputPromise = this.broadcastOutput({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber,
    signingKeyPair,
    last,
    priorParticipant,
    lastParticipant,
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
  for (const publicKeyString of participantsOrdered) {
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
