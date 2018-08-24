import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/validate
 */
class Receiver {
  /**
   * @param {protobufjs.Root} protocol - Protocol definition.
   * @param {Receiver} nextReceiver - Receiver to deliver message to.
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
