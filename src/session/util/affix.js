import { bytesToBase64, stringToUtf8 } from '/aid/convert'

/**
 * Affix signature to packet.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {protocol.Packet} packet - Packet to affix signature to.
 *     Not modified.
 * @param {Uint8Array} signature - Detached signature.
 * @param {protobufjs.Root} protocol - Protocol definition. Not modified.
 *
 * @return {protocol.Signed} The signed packet.
 */
async function affix (packet, signature, protocol) {
  const packetObject = protocol.Packet.toObject(packet)
  const signatureBase64 = bytesToBase64(signature)
  const signatureEncoded = stringToUtf8(signatureBase64)
  const signedObject = {
    packet: packetObject,
    signature: { signature: signatureEncoded }
  }
  const signed = protocol.Signed.fromObject(signedObject)
  return signed
}

export default affix
