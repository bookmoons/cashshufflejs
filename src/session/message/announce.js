import { transferEncodeKey } from '/aid/code'
import { Phase } from '/protocol'

/**
 * @typedef {object} MessageAnnounceParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition. Not modified.
 * @prop {Uint8Array} signingPublicKey - Signing public key. Not modified.
 * @prop {Uint8Array} sessionId - Session identifier. Not modified.
 * @prop {number} poolNumber - Shuffler pool number.
 * @prop {HexString} encryptionPublicKey - Public key of encryption key pair.
 */

/**
 * Construct announce message.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {MessageAnnounceParams} params
 *
 * @return {protocol.Packet} Unsigned announce message.
 */
function messageAnnounce ({
  protocol,
  signingPublicKey,
  sessionId,
  poolNumber,
  encryptionPublicKey
}) {
  const encryptionKeyObject = { key: encryptionPublicKey }
  const messageObject = { key: encryptionKeyObject }
  const signingPublicKeyEncoded = transferEncodeKey(signingPublicKey)
  const fromKeyObject = { key: signingPublicKeyEncoded }
  const packetObject = {
    session: sessionId,
    number: poolNumber,
    fromKey: fromKeyObject,
    phase: Phase.Announcement.value,
    message: messageObject
  }
  const packet = protocol.Packet.fromObject(packetObject)
  return packet
}

export default messageAnnounce
