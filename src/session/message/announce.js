import { Phase } from '../../protocol'

/**
 * @typedef {object} MessageAnnounceParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition.
 * @prop {HexString} signingPublicKey - Signing public key.
 * @prop {ArrayBuffer} sessionId - Session identifier.
 * @prop {number} poolNumber - Participant pool number.
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
  const sessionIdView = new Uint8Array(sessionId)
  const encryptionKeyObject = { key: encryptionPublicKey }
  const messageObject = { key: encryptionKeyObject }
  const fromKeyObject = { key: signingPublicKey }
  const packetObject = {
    session: sessionIdView,
    number: poolNumber,
    fromKey: fromKeyObject,
    phase: Phase.Announcement.value,
    message: messageObject
  }
  const packet = protocol.Packet.fromObject(packetObject)
  return packet
}

export default messageAnnounce
