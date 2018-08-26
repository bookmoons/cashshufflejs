const phaseIdentifier = 1 // Phase Announcement

/**
 * Construct announce message.
 *
 * Phase identifier 1.
 *
 * @memberof module:cashshuffle/session~Session
 *
 * @param {protobufjs.Root} protocol - Protocol definition.
 * @param {ArrayBuffer} sessionId - Session identifier.
 * @param {string} encryptionPublicKey - Public key of encryption key pair
 *     as hex string.
 *
 * @return {protocol.Packet} Unsigned announce message.
 */
function messageAnnounce (protocol, sessionId, encryptionPublicKey) {
  const sessionIdView = new Uint8Array(sessionId)
  const encryptionKeyObject = {
    key: encryptionPublicKey
  }
  const messageObject = {
    key: encryptionKeyObject
  }
  const packetObject = {
    session: sessionIdView,
    phase: phaseIdentifier,
    message: messageObject
  }
  const packet = protocol.Packet.fromObject(packetObject)
  return packet
}

export default messageAnnounce