import privs from './privs'

/**
 * Package a `protocol.Signed` into a unary `protocol.Packets`.
 *
 * @memberof module:cashshuffle/session~Session
 *
 * @param {protocol.Signed} signedPacket - Signed packet instance.
 *
 * @return {protocol.Packets} Unary packets list containing the signed packet.
 */
async function packageSignedPacket (signedPacket) {
  const priv = privs.get(this)
  const Signed = priv.protocol.Signed
  const Packets = priv.protocol.Packets
  const signedPacketObject = Signed.toObject(signedPacket)
  const packetsList = [ signedPacketObject ]
  const packetsObject = { packet: packetsList }
  const packets = Packets.fromObject(packetsObject)
  return packets
}

export default packageSignedPacket
