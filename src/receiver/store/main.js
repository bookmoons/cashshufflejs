import FifoInbox from '../../inbox/fifo'
import Receiver from '../base'
import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/store
 *
 * @implements {Receiver}
 */
class StoreReceiver extends Receiver {
  /**
   * @param {function} [inbox=<fifo>] - Inbox to deliver messages to.
   *     Defaults to new FIFO inbox.
   */
  constructor (inbox) {
    super()
    if (!inbox) inbox = new FifoInbox()
    const priv = {
      inbox
    }
    privs.set(this, priv)
  }
}

export default StoreReceiver
