import privs from './privs'
import delimit from './delimit'

/**
 * Broadcast message to all connections.
 *
 * @param {protocol.Signed} signedPacket - Signed packet to broadcast.
 */
async function broadcast (signedPacket) {
  const priv = privs.get(this)
  const protocol = priv.protocol
  const message = protocol.Signed.encode(signedPacket).finish()
  const frame = delimit(message)
  const connections = priv.connections
  for (const { localEnd } of connections.values()) localEnd.write(frame)
}

export default broadcast
