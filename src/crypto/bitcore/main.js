import privs from './privs'

class BitcoreCrypto {
  constructor () {
    const priv = {}
    privs.set(this, priv)
  }
}

export default BitcoreCrypto
