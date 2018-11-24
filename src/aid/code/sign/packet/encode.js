import normalizeProtobufBytes from '../../../normalize/protobuf/bytes'

/**
 * Encode packet for signing.
 *
 * Encodes to undelimited wire format.
 *
 * @memberof module:cashshuffle/aid/code
 *
 * @param {protocol.Root} protocol - Protocol definition. Not modified.
 * @param {protocol.Packet} packet - Packet to encode. Not modified.
 *
 * @return {Uint8Array} `packet` encoded for signing.
 */
function signEncodePacket (protocol, packet) {
  const wireMessageDenormal = protocol.Packet.encode(packet).finish()
  const wireMessage = normalizeProtobufBytes(wireMessageDenormal)
  return wireMessage
}

export default signEncodePacket
