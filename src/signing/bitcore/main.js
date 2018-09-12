import privs from './privs'

class BitcoreSigning {
  constructor () {
    const priv = {}
    privs.set(this, priv)
  }
}

export default BitcoreSigning
