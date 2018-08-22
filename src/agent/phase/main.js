import privs from './privs'

class Agent {
  constructor () {
    const priv = {}
    privs.set(this, priv)
  }
}

export default Agent
