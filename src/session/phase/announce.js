import Crypto from '../../crypto/bitcore'
import { defaultAttempts, defaultNetwork, defaultTimeout } from '../default'

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
 * @prop {number} poolNumber - Participant pool number.
 * @prop {Signing} signingKeyPair - Participant signing key pair.
 *     Assumed ready for use.
 * @prop {number} amount - Amount to shuffle in satoshis.
 * @prop {number} fee - Participant fee amount in satoshis.
 *     The produced transaction will charge this fee to each participant.
 * @prop {Coin} coin - Bitcoin Cash network interface.
 * @prop {Outchan} outchan - Output message channel.
 * @prop {PhaseReceiver} receiver - Phase message receiver.
 * @prop {Receiver} [discarder=null] - Receiver to discard messages to.
 * @prop {Logchan} [log=null] - Logging channel.
 * @prop {bitcore.Network} [network=<mainnet>] - Bitcoin Cash network.
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
  poolNumber,
  signingKeyPair,
  amount,
  fee,
  coin,
  outchan,
  receiver,
  discarder = null,
  log = null,
  network = defaultNetwork
}) {
  /* Generate encryption key pair. */
  const encryptionKeyPair = new Crypto()
  await encryptionKeyPair.generateKeyPair(network)

  /* Broadcast encryption public key. */
  const signingPublicKey = await signingKeyPair.exportPublicKey()
  const encryptionPublicKey = await encryptionKeyPair.exportPublicKey()
  const ownPacket = await this.messageAnnounce({
    protocol,
    signingPublicKey,
    sessionId,
    poolNumber,
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
  if (log) await log.send('Broadcasted encryption public key')

  /* Gather other participant messages. */
  const otherPackets = await this.gatherAnnounce({
    attempts,
    timeout,
    signingPublicKey,
    amount,
    fee,
    coin,
    receiver,
    discarder,
    network
  })
  if (log) await log.send('Gathered participant encryption keys')

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
