/**
 * Package a `protocol.Signed` into a unary `protocol.Packets`.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {protobufjs.Root} protocol - Protocol definition. Not modified.
 * @param {protocol.Signed} signedPacket - Signed packet instance.
 *     Not modified.
 *
 * @return {protocol.Packets} Unary packets list containing the signed packet.
 */
async function packageSignedPacket (protocol, signedPacket) {
  const Signed = protocol.Signed
  const Packets = protocol.Packets
  const signedPacketObject = Signed.toObject(signedPacket)
  const packetsList = [ signedPacketObject ]
  const packetsObject = { packet: packetsList }
  const packets = Packets.fromObject(packetsObject)
  return packets
}

export default packageSignedPacket
