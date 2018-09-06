import { Phase } from '../../protocol'

/**
 * @typedef {object} MessageAnnounceParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition.
 * @prop {HexString} signingPublicKey - Signing public key.
 * @prop {ArrayBuffer} sessionId - Session identifier.
 * @prop {number} participantNumber - Participant index in pool in join order.
 * @prop {HexString} encryptionPublicKey - Public key of encryption key pair.
 */

/**
 * Construct announce message.
 *
 * Phase identifier 1.
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
  participantNumber,
  encryptionPublicKey
}) {
  const sessionIdView = new Uint8Array(sessionId)
  const encryptionKeyObject = {
    key: encryptionPublicKey
  }
  const messageObject = {
    key: encryptionKeyObject
  }
  const fromKeyObject = {
    key: signingPublicKey
  }
  const packetObject = {
    session: sessionIdView,
    number: participantNumber,
    fromKey: fromKeyObject,
    phase: Phase.Announcement.value,
    message: messageObject
  }
  const packet = protocol.Packet.fromObject(packetObject)
  return packet
}

export default messageAnnounce
