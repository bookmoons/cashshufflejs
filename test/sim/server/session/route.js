import privs from './privs'
import broadcast from './broadcast'
import unicast from './unicast'

/**
 * Route signed packet.
 *
 * Broadcasts or unicasts packet to connected users.
 * Discards packet with invalid to key.
 *
 * @param {protocol.Signed} signedPacket - Signed packet to route.
 *     Not modified.
 */
async function routeSignedPacket (signedPacket) {
  const priv = privs.get(this)
  const protocol = priv.protocol
  const signedPacketObject = protocol.Signed.toObject(signedPacket)
  const packetObject = signedPacketObject.packet
  if (!packetObject) return
  const toKeyObject = packetObject.toKey
  if (!toKeyObject) {
    await broadcast.call(this, signedPacket)
    return
  }
  const toKey = toKeyObject.key
  if (!toKey) {
    await broadcast.call(this, signedPacket)
    return
  }
  const connections = priv.connections
  if (connections.has(toKey)) await unicast.call(this, toKey, signedPacket)
}

export default routeSignedPacket
