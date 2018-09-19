import Inbox from '../base'
import privs from './privs'

/**
 * @memberof module:cashshuffle/inbox/fifo
 *
 * @implements {Inbox}
 */
class FifoInbox extends Inbox {
  constructor () {
    super()
    const priv = {
      watching: false,
      timer: null,
      watcher: null,
      messages: []
    }
    privs.set(this, priv)
  }
}

export default FifoInbox
