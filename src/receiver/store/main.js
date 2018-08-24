import FifoInbox from '../../inbox/fifo'
import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/store
 */
class Receiver {
  /**
   * @param {function} [inbox=<fifo>] - Inbox to deliver messages to.
   *     Defaults to new FIFO inbox.
   */
  constructor (inbox) {
    if (!inbox) inbox = new FifoInbox()
    const priv = {
      inbox
    }
    privs.set(this, priv)
  }
}

export default Receiver
