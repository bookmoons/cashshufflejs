import Logchan from '../base'
import privs from './privs'

/**
 * @memberof module:cashshuffle/logchan/prefix
 */
class PrefixLogchan extends Logchan {
  /**
   * @param {string} prefix - Prefix to add to each message.
   * @param {Logchan} nextLogchan - Logchan to relay messages to.
   */
  constructor (prefix, nextLogchan) {
    super()
    const priv = {
      prefix,
      nextLogchan
    }
    privs.set(this, priv)
  }
}

export default PrefixLogchan
