import privs from './privs'

class Crypto {
  constructor () {
    const priv = {}
    privs.set(this, priv)
  }
}

export default Crypto
