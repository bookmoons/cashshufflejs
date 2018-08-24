import FifoInbox from '../../inbox/fifo'
import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/store
 */
class Receiver {
  /**
   * @param {function} [Inbox=<fifo>] - Constructor for preferred inbox type.
   */
  constructor (Inbox = FifoInbox) {
    const inbox = new Inbox()
    const priv = {
      inbox
    }
    privs.set(this, priv)
  }
}

export default Receiver
