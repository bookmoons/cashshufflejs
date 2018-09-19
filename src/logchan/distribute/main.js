import Logchan from '../base'
import privs from './privs'

/**
 * @memberof module:cashshuffle/logchan/distribute
 *
 * @implements {Logchan}
 */
class DistributeLogchan extends Logchan {
  /**
   * @param {Iterable<Logchan>} recipients - `Logchan` instances to deliver to.
   */
  constructor (recipients) {
    super()
    const recipientsSet = new Set(recipients)
    const priv = {
      recipients: recipientsSet
    }
    privs.set(this, priv)
  }
}

export default DistributeLogchan
