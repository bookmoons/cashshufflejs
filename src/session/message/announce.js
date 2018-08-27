const phaseIdentifier = 1 // Phase Announcement

/**
 * @typedef {object} MessageAnnounceParams
 * @memberof module:cashshuffle/session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition.
 * @prop {ArrayBuffer} sessionId - Session identifier.
 * @prop {number} participantNumber - Participant index in pool in join order.
 * @prop {string} encryptionPublicKey - Public key of encryption key pair
 *     as hex string.
 */

/**
 * Construct announce message.
 *
 * Phase identifier 1.
 *
 * @memberof module:cashshuffle/session~Session
 *
 * @param {module:cashshuffle/session~MessageAnnounceParams} params
 *
 * @return {protocol.Packet} Unsigned announce message.
 */
function messageAnnounce ({
  protocol,
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
  const packetObject = {
    session: sessionIdView,
    number: participantNumber,
    phase: phaseIdentifier,
    message: messageObject
  }
  const packet = protocol.Packet.fromObject(packetObject)
  return packet
}

export default messageAnnounce
