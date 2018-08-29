/**
 * Affix signature to packet.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {protocol.Packet} packet - Packet to affix signature to.
 * @param {string} signature - Detached signature as Base64 string.
 * @param {protobufjs.Root} protocol - Protocol definition.
 *
 * @return {protocol.Signed} The signed packet.
 */
async function affix (packet, signature, protocol) {
  const packetObject = protocol.Packet.toObject(packet)
  const signatureBuffer = Buffer.from(signature)
  const signedObject = {
    packet: packetObject,
    signature: { signature: signatureBuffer }
  }
  const signed = protocol.Signed.fromObject(signedObject)
  return signed
}

export default affix
