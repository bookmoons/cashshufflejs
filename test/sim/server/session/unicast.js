import privs from './privs'
import delimit from './delimit'

/**
 * Unicast signed packet.
 *
 * Sends signed packet to connection named in `to_key.key`.
 * Assumed to have a valid to key.
 *
 * @param {HexString} to - Signing public key of recipient.
 * @param {protocol.Signed} signedPacket - Signed packet to unicast.
 */
async function unicast (to, signedPacket) {
  const priv = privs.get(this)
  const protocol = priv.protocol
  const message = protocol.Signed.encode(signedPacket).finish()
  const frame = delimit(message)
  const connections = priv.connections
  const { localEnd } = connections.get(to)
  localEnd.write(frame)
}

export default unicast
