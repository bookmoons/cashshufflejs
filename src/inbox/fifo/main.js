import privs from './privs'

class Inbox {
  constructor () {
    const priv = {
      messages: []
    }
    privs.set(this, priv)
  }
}

export default Inbox
