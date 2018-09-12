import Inbox from '../base'
import privs from './privs'

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
