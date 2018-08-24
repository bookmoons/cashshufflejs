import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/authenticate
 */
class Receiver {
  /**
   * @param {protobufjs.Root} protocol - Protocol definition.
   * @param {Receiver} nextReceiver - Receiver to deliver message to.
   * @param {Receiver} [discarder=null] - Message receiver that handles
   *     discarded messages.
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
