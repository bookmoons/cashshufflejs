import Crypto from '../base'
import privs from './privs'

/**
 * @memberof module:cashshuffle/crypto/bitcore
 *
 * @implements {Crypto}
 */
class BitcoreCrypto extends Crypto {
  constructor () {
    super()
    const priv = {}
    privs.set(this, priv)
  }
}

export default BitcoreCrypto
