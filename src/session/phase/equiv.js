import isEqual from 'arraybuffer-equal'
import { ValueError } from '../../error'
import PrefixLogchan from '../../logchan/prefix'
import bufferToBytes from 'util/tobytes/buffer'
import { defaultAttempts, defaultTimeout } from '../default'

/**
 * @typedef {object} EquivocationCheckParams
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
 * @prop {Iterable<HexString>} encryptionPublicKeys - Encryption public keys
 *     for shufflers 2 through last ascending in shuffle order.
 * @prop {Iterable<Address>} outputList - Final output list
 *     in broadcast message order.
 * @prop {Crypto} crypto - Message encryptor. Assumed ready for use.
 * @prop {Outchan} outchan - Output message channel.
 * @prop {PhaseReceiver} receiver - Phase message receiver.
 * @prop {Receiver} [discarder=] - Receiver to discard messages to.
 * @prop {Logchan} [log=] - Logging channel.
 */

/**
 * @memberof module:cashshuffle/session.Session
 *
 * @param {EquivocationCheckParams} params
 *
 * @throws {ValueError} If equivocation is detected. Message `'equivocation'`.
 */
async function checkEquivocation ({
  protocol,
  attempts = defaultAttempts,
  timeout = defaultTimeout,
  sessionId,
  poolNumber,
  signingKeyPair,
  encryptionPublicKeys,
  outputList,
  crypto,
  outchan,
  receiver,
  discarder = null,
  log = null
}) {
  /* Prefix log messages. */
  log = log ? new PrefixLogchan('P4: ', log) : null

  /* Prepare hash input. */
  const hashInput = this.hashInput(encryptionPublicKeys, outputList)

  /* Compute digest. */
  const ownDigest = await crypto.hash(hashInput)

  /* Broadcast digest. */
  const signingPublicKey = await signingKeyPair.exportPublicKey()
  const ownPacket = await this.messageDigest({
    protocol,
    signingPublicKey,
    sessionId,
    poolNumber,
    digest: ownDigest
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
  if (log) await log.send('Broadcasted output list hash')

  /* Gather other shuffler messages. */
  const otherPackets = await this.gatherDigest({
    attempts,
    timeout,
    signingPublicKey,
    receiver,
    discarder
  })

  /* Extract other shuffler digests. */
  const otherDigests = new Map()
  for (const [ publicKey, packetObject ] of otherPackets) {
    const messageObject = packetObject.message
    const hashObject = messageObject.hash
    const digestValue = hashObject.hash
    // Normalize to Buffer. protobufjs can return Uint8Array Buffer Array.
    const digestBuffer = Buffer.from(digestValue)
    const digest = bufferToBytes(digestBuffer).buffer
    otherDigests.set(publicKey, digest)
  }

  /* Verify all digests equal. */
  for (const [ publicKey, otherDigest ] of otherDigests) {
    if (!isEqual(otherDigest, ownDigest)) {
      throw new ValueError(
        { info: {
          ownDigest,
          otherDigest,
          equivocator: publicKey
        } },
        'equivocation'
      )
    }
  }
  if (log) await log.send('Verified all output list hashes')
}

export default checkEquivocation
