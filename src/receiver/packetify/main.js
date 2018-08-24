import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/packetify
 */
class Receiver {
  /**
   * @param {protobufjs.Root} protocol - Protocol definition.
   * @param {Receiver} nextReceiver - Receiver to deliver to message to.
   */
  constructor (protocol, nextReceiver) {
    const priv = {
      protocol,
      nextReceiver
    }
    privs.set(this, priv)
  }
}

export default Receiver
