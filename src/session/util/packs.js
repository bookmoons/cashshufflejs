/**
 * Package a set of `protocol.Signed` instances into a `protocol.Packets`.
 *
 * Packaged in provided order.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {protobufjs.Root} protocol - Protocol definition. Not modified.
 * @param {Iterable<protocol.Signed>} signedPackets - Signed packet instances.
 *     Items not modified.
 *
 * @return {protocol.Packets} Packets list containing the signed packets
 *     in provided order.
 */
async function packageSignedPackets (protocol, signedPackets) {
  const Signed = protocol.Signed
  const Packets = protocol.Packets
  const packetsList = []
  for (const signedPacket of signedPackets) {
    const signedPacketObject = Signed.toObject(signedPacket)
    packetsList.push(signedPacketObject)
  }
  const packetsObject = { packet: packetsList }
  const packets = Packets.fromObject(packetsObject)
  return packets
}

export default packageSignedPackets
