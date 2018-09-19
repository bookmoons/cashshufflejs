import Receiver from '../base'
import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/objectify
 *
 * @implements {Receiver}
 */
class ObjectifyReceiver extends Receiver {
  /**
   * @param {protobufjs.Root} protocol - Protocol definition.
   * @param {Receiver} nextReceiver - Receiver to deliver message to.
   */
  constructor (protocol, nextReceiver) {
    super()
    const priv = {
      protocol,
      nextReceiver
    }
    privs.set(this, priv)
  }
}

export default ObjectifyReceiver
