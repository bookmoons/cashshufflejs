import Signing from '../base'
import privs from './privs'

class BitcoreSigning extends Signing {
  constructor () {
    super()
    const priv = {}
    privs.set(this, priv)
  }
}

export default BitcoreSigning
