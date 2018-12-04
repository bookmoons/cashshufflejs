import normalizeProtobufBytes from '/aid/normalize/protobuf/bytes'

/**
 * Encode message for wire transfer.
 *
 * Serializes to [protobuf wire format][1].
 *
 * [1]: https://developers.google.com/protocol-buffers/docs/encoding
 *
 * @memberof module:cashshuffle/aid/code
 *
 * @param {protocol.Root} protocol - Protocol definition. Not modified.
 * @param {protocol.Packets} packets - Message to encode. Not modified.
 *
 * @return {Uint8Array} `packets` encoded for wire transfer.
 */
function transferEncodePackets (protocol, packets) {
  const wireMessageDenormal = protocol.Packets.encode(packets).finish()
  const wireMessage = normalizeProtobufBytes(wireMessageDenormal)
  return wireMessage
}

export default transferEncodePackets
