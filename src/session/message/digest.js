import { bytesToHex } from '/aid/convert'
import { Phase } from '/protocol'

/**
 * @typedef {object} MessageDigestParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition. Not modified.
 * @prop {Uint8Array} signingPublicKey - Signing public key.
 * @prop {Uint8Array} sessionId - Session identifier. Not modified.
 * @prop {number} poolNumber - Shuffler pool number.
 * @prop {Uint8Array} digest - Digest. Not modified.
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
  const hashObject = { hash: digest }
  const messageObject = { hash: hashObject }
  const signingPublicKeyHex = bytesToHex(signingPublicKey)
  const fromKeyObject = { key: signingPublicKeyHex }
  const packetObject = {
    session: sessionId,
    number: poolNumber,
    fromKey: fromKeyObject,
    phase: Phase.EquivocationCheck.value,
    message: messageObject
  }
  const packet = protocol.Packet.fromObject(packetObject)
  return packet
}

export default messageDigest
