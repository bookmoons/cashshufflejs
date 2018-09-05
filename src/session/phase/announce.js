import Crypto from '../../crypto/bitcore'
import { defaultAttempts, defaultTimeout } from '../default'

/**
 * @typedef {object} AnnounceParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition.
 * @prop {number} [attempts=<default>] - Maximum gather attempts.
 *     Positive integer.
 * @prop {number} [timeout=<default>] - Network operation timeout
 *     in milliseconds.
 * @prop {ArrayBuffer} sessionId - Session identifier.
 * @prop {number} participantNumber - Participant index in pool in join order.
 * @prop {Signing} signingKeyPair - Participant signing key pair.
 *     Assumed ready for use.
 * @prop {number} amount - Amount to shuffle in satoshis.
 * @prop {Coin} coin - Bitcoin Cash network interface.
 * @prop {Outchan} outchan - Output message channel.
 * @prop {Receiver} receiver - Phase message receiver.
 * @prop {Receiver} [discarder=null] - Receiver to discard messages to.
 */

/**
 * @typedef {object} AnnounceReturn
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {Crypto} encryptionKeyPair - Own encryption key pair.
 * @prop {Map<HexString-HexString>} encryptionPublicKeys
 *     Other participant encryption public keys.
 *     Index participant signing public key.
 *     Value participant encryption public key.
 */

/**
 * @memberof module:cashshuffle/session.Session
 *
 * @param {AnnounceParams} params
 *
 * @return {AnnounceReturn}
 *
 * @throws {InadequateError} If any participant has insufficient funds.
 *     Message `'insufficient funds'`.
 */
async function announce ({
  protocol,
  attempts = defaultAttempts,
  timeout = defaultTimeout,
  sessionId,
  participantNumber,
  signingKeyPair,
  amount,
  coin,
  outchan,
  receiver,
  discarder = null
}) {
  /* Generate encryption key pair. */
  const encryptionKeyPair = new Crypto()
  await encryptionKeyPair.generateKeyPair()

  /* Broadcast encryption public key. */
  const signingPublicKey = await signingKeyPair.exportPublicKey()
  const encryptionPublicKey = await encryptionKeyPair.exportPublicKey()
  const ownPacket = await this.messageAnnounce({
    protocol,
    signingPublicKey,
    sessionId,
    participantNumber,
    encryptionPublicKey
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

  /* Gather other participant messages. */
  const otherPackets = await this.gatherAnnounce({
    attempts,
    timeout,
    signingPublicKey,
    amount,
    coin,
    receiver,
    discarder
  })

  /* Return encryption keys. */
  const participantInboxes = receiver.participantInboxes
  participantInboxes.delete(signingPublicKey)
  const signingKeys = [ ...participantInboxes.keys() ]
  const encryptionPublicKeys = new Map()
  for (const signingKey of signingKeys) {
    const packet = otherPackets.get(signingKey)
    const encryptionPublicKey = packet.message.key.key
    encryptionPublicKeys.set(signingKey, encryptionPublicKey)
  }
  return {
    encryptionKeyPair,
    encryptionPublicKeys
  }
}

export default announce
