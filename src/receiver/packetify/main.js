import Receiver from '../base'
import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/packetify
 *
 * @implements {Receiver}
 */
class PacketifyReceiver extends Receiver {
  /**
   * @param {protobufjs.Root} protocol - Protocol definition.
   * @param {Receiver} nextReceiver - Receiver to deliver message to.
   * @param {Receiver} [discarder=] - Receiver to discard message to.
   */
  constructor (protocol, nextReceiver, discarder = null) {
    super()
    const priv = {
      protocol,
      nextReceiver,
      discarder
    }
    privs.set(this, priv)
  }
}

export default PacketifyReceiver
