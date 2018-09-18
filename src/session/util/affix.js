import { stringToUtf8 } from '../../aid'

/**
 * Affix signature to packet.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {protocol.Packet} packet - Packet to affix signature to.
 * @param {Base64} signature - Detached signature.
 * @param {protobufjs.Root} protocol - Protocol definition.
 *
 * @return {protocol.Signed} The signed packet.
 */
async function affix (packet, signature, protocol) {
  const packetObject = protocol.Packet.toObject(packet)
  const signatureBytes = stringToUtf8(signature)
  const signedObject = {
    packet: packetObject,
    signature: { signature: signatureBytes }
  }
  const signed = protocol.Signed.fromObject(signedObject)
  return signed
}

export default affix
