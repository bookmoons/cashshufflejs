import privs from '../privs'

/**
 * Process new binary message from connection.
 *
 * @param {object} connection - Connection package.
 * @param {Buffer} message - Binary message to process. Not modified.
 */
async function processMessage (connection, message) {
  const priv = privs.get(this)
  const protocol = priv.protocol
  const packets = protocol.Packets.decode(message)
  const packetsObject = protocol.Packets.toObject(packets)
  const signedPackets = packetsObject.packet
  if (!signedPackets) return
  for (const signedPacketObject of signedPackets) {
    const signedPacket = protocol.Signed.fromObject(signedPacketObject)
    priv.routeQueue.add(signedPacket)
  }
}

export default processMessage
