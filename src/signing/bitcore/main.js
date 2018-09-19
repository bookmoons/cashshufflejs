import Signing from '../base'
import privs from './privs'

/**
 * @memberof module:cashshuffle/signing/bitcore
 *
 * @implements {Signing}
 */
class BitcoreSigning extends Signing {
  constructor () {
    super()
    const priv = {}
    privs.set(this, priv)
  }
}

export default BitcoreSigning
