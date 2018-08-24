import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/packetify
 */
class Receiver {
  /**
   * @param {protobufjs.Root} protocol - Protocol definition.
   * @param {Receiver} nextReceiver - Receiver to deliver message to.
   * @param {Receiver} [discarder=null] - Receiver to discard message to.
   */
  constructor (protocol, nextReceiver, discarder = null) {
    const priv = {
      protocol,
      nextReceiver,
      discarder
    }
    privs.set(this, priv)
  }
}

export default Receiver
