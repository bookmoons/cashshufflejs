import { Phase } from '../../protocol'

/**
 * @typedef {object} MessageDigestParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition.
 * @prop {HexString} signingPublicKey - Signing public key.
 * @prop {ArrayBuffer} sessionId - Session identifier.
 * @prop {number} poolNumber - Participant pool number.
 * @prop {ArrayBuffer} digest - Digest.
 */

/**
 * Construct digest message.
 *
 * Digest is in the `packet.message.hash.hash` field.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {MessageDigestParams} params
 *
 * @return {protocol.Packet} Unsigned digest message.
 */
function messageDigest ({
  protocol,
  signingPublicKey,
  sessionId,
  poolNumber,
  digest
}) {
  const sessionIdView = new Uint8Array(sessionId)
  const digestView = new Uint8Array(digest)
  const hashObject = { hash: digestView }
  const messageObject = { hash: hashObject }
  const fromKeyObject = { key: signingPublicKey }
  const packetObject = {
    session: sessionIdView,
    number: poolNumber,
    fromKey: fromKeyObject,
    phase: Phase.EquivocationCheck.value,
    message: messageObject
  }
  const packet = protocol.Packet.fromObject(packetObject)
  return packet
}

export default messageDigest
