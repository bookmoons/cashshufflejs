import bitcore from 'bitcore-lib-cash'
import { InadequateError, ValueError } from '../../error'
import PrefixLogchan from '../../logchan/prefix'
import { defaultAttempts, defaultNetwork, defaultTimeout } from '../default'

/**
 * @typedef {object} SubmitParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition.
 * @prop {number} [attempts=<default>] - Maximum gather attempts.
 *     Positive integer.
 * @prop {number} [timeout=<default>] - Network operation timeout
 *     in milliseconds.
 * @prop {ArrayBuffer} sessionId - Session identifier.
 * @prop {number} poolNumber - Shuffler pool number.
 * @prop {Signing} signingKeyPair - Shuffler signing key pair.
 *     Assumed ready for use.
 * @prop {number} amount - Amount to shuffle in satoshis.
 * @prop {number} fee - Shuffler fee amount in satoshis.
 *     The produced transaction will charge this fee to each shuffler.
 * @prop {Map<HexString-CashAddress>} inputAddresses - Input addresses.
 *     Key shuffler signing public key. Value input address.
 * @prop {Iterable<Address>} outputAddresses - Output addresses.
 * @prop {Map<HexString-Address>} changeAddresses - Change addresses.
 *     Key shuffler signing public key. Value change address.
 * @prop {Coin} coin - Bitcoin Cash network interface.
 * @prop {Outchan} outchan - Output message channel.
 * @prop {PhaseReceiver} receiver - Phase message receiver.
 * @prop {Receiver} [discarder=] - Receiver to discard messages to.
 * @prop {Logchan} [log=] - Logging channel.
 * @prop {bitcore.Network} [network=<mainnet>] - Bitcoin Cash network.
 */

/**
 * @typedef {object} SubmitReturn
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {module:cashshuffle/coin~Transaction} transaction - The submitted
 *     Bitcoin Cash transaction.
 */

/**
 * @memberof module:cashshuffle/session.Session
 *
 * @param {SubmitParams} params
 *
 * @return {SubmitReturn}
 *
 * @throws {ValueError} If any received signature is invalid.
 *     Message `'invalid signature'`.
 * @throws {InadequateError} If any other shuffler input now shows
 *     insufficient funds. Message `'insufficient funds'`.
 */
async function submit ({
  protocol,
  attempts = defaultAttempts,
  timeout = defaultTimeout,
  sessionId,
  poolNumber,
  signingKeyPair,
  shufflersCount,
  amount,
  fee,
  inputAddresses,
  outputAddresses,
  changeAddresses,
  coin,
  outchan,
  receiver,
  discarder = null,
  log = null,
  network = defaultNetwork
}) {
  /* Prefix log messages. */
  log = log ? new PrefixLogchan('P5: ', log) : null

  /* Construct unsigned transaction. */
  const transaction = await coin.makeUnsignedTransaction(
    amount,
    fee,
    inputAddresses,
    outputAddresses,
    changeAddresses
  )
  if (log) await log.send('Constructed shuffling transaction')

  /* Sign transaction. */
  let signingPrivateKey = await signingKeyPair.exportPrivateKey()
  const ownSignatures = await coin.signTransactionInputs(
    transaction,
    signingPrivateKey
  )
  signingPrivateKey = null

  /* Broadcast signatures. */
  const signingPublicKey = await signingKeyPair.exportPublicKey()
  const ownPacket = await this.messageSignature({
    protocol,
    signingPublicKey,
    sessionId,
    poolNumber,
    signatures: ownSignatures
  })
  const signature = await this.sign(
    signingKeyPair,
    ownPacket,
    protocol.Packet
  )
  const ownSignedPacket = await this.affix(
    ownPacket,
    signature,
    protocol
  )
  const ownPackage = await this.packageSignedPacket(
    protocol,
    ownSignedPacket
  )
  await outchan.send(ownPackage)
  if (log) await log.send('Broadcasted own transaction signature')

  /* Gather other shuffler messages. */
  const otherPackets = await this.gatherSignature({
    attempts,
    timeout,
    signingPublicKey,
    receiver,
    discarder
  })
  if (log) await log.send('Gathered shuffler transaction signatures')

  /* Extract other shuffler signatures. */
  const otherSignatures = new Map()
  for (const [ publicKey, packetObject ] of otherPackets) {
    const messageObject = packetObject.message
    const inputSignatureObjects = messageObject.signatures
    const inputSignatures = []
    for (const inputSignatureObject of inputSignatureObjects) {
      const indexLong = inputSignatureObject.index
      const index = indexLong.toString(10)
      const signatureObject = inputSignatureObject.signature
      const signatureValue = signatureObject.signature
      // Normalize to Buffer.
      const signatureBuffer = Buffer.from(signatureValue)
      const signature = signatureBuffer.toString('hex')
      const inputSignature = [ index, signature ]
      inputSignatures.push(inputSignature)
    }
    otherSignatures.set(publicKey, inputSignatures)
  }

  /* Verify signatures. */
  for (const [ publicKey, inputSignature ] of otherSignatures) {
    for (const [ inputIndex, signature ] of inputSignature) {
      const valid = await coin.verifyTransactionSignature(
        transaction,
        inputIndex,
        signature
      )
      if (!valid) {
        throw new ValueError(
          { info: {
            transaction,
            publicKey,
            inputIndex,
            signature
          } },
          'invalid signature'
        )
      }
    }
  }
  if (log) await log.send('Verified all signatures')

  /* Construct signed transaction. */
  await coin.addTransactionSignatures(transaction, ownSignatures)
  for (const shufflerInputSignatures of otherSignatures) {
    const signatures = shufflerInputSignatures[1]
    await coin.addTransactionSignatures(transaction, signatures)
  }

  /* Submit signed transaction to Bitcoin Cash network. */
  await coin.broadcastTransaction(transaction)
  if (log) await log.send('Submitted transaction to BCH network')

  /* Detect double spend. */
  // TODO: Is there a danger of detecting the shuffle spend here?
  const shufflerTotal = amount + fee
  const shufflerInboxes = receiver.shufflerInboxes
  shufflerInboxes.delete(signingPublicKey)
  const publicKeyStrings = [ ...shufflerInboxes.keys() ]
  for (const publicKeyString of publicKeyStrings) {
    const publicKey = new bitcore.PublicKey(publicKeyString, { network })
    const address = publicKey.toAddress(network)
    const addressString = address.toCashAddress()
    const sufficientFunds = await coin.sufficientFunds(
      addressString,
      shufflerTotal
    )
    if (!sufficientFunds) {
      throw new InadequateError(
        { info: { address: addressString, amount: shufflerTotal } },
        'insufficient funds'
      )
    }
  }
  if (log) await log.send('Verified no double spends')

  /* Return submitted transaction. */
  return { transaction }
}

export default submit
