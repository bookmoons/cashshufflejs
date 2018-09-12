import Crypto from '../base'
import privs from './privs'

class BitcoreCrypto extends Crypto {
  constructor () {
    super()
    const priv = {}
    privs.set(this, priv)
  }
}

export default BitcoreCrypto
