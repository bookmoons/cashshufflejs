import Discarder from '../base'
import privs from './privs'

/**
 * @memberof module:cashshuffle/discarder/log
 */
class LogDiscarder extends Discarder {
  /**
   * @param {Logchan} log - Logging channel.
   */
  constructor (log) {
    super()
    const priv = {
      log
    }
    privs.set(this, priv)
  }
}

export default LogDiscarder
