import privs from './privs'

class Inbox {
  constructor () {
    const priv = {
      watching: false,
      timer: null,
      watcher: null,
      messages: []
    }
    privs.set(this, priv)
  }
}

export default Inbox
