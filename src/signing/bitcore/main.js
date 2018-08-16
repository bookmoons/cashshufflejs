import privs from './privs'

class Signing {
  constructor () {
    const priv = {}
    privs.set(this, priv)
  }
}

export default Signing
