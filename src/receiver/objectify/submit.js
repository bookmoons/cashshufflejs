import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/objectify~Receiver
 *
 * @param {protocol.Packet} message - Packet to convert to object.
 *     Assumed valid.
 */
async function submit (message) {
  const priv = privs.get(this)
  const messageObject = priv.protocol.Packet.toObject(message)
  await priv.nextReceiver.submit(messageObject)
}

export default submit
