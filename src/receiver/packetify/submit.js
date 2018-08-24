import { MissingValueError } from '../../error'
import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/packetify~Receiver
 *
 * @param {protocol.Signed} message - Signed packet to extract packet from.
 *     Assumed valid.
 */
async function submit (message) {
  const priv = privs.get(this)
  const protocol = priv.protocol
  const signedObject = protocol.Signed.toObject(message)
  const packetObject = signedObject.packet
  if (typeof packetObject !== 'object') {
    if (priv.discarder) {
      await priv.discarder.submit([
        new MissingValueError('packet'),
        message
      ])
    }
    return
  }
  const packet = protocol.Packet.fromObject(packetObject)
  await priv.nextReceiver.submit(packet)
}

export default submit
