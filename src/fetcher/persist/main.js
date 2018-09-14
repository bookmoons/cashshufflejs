import Fetcher from '../base'
import privs from './privs'

/**
 * Message acceptance evaluator.
 *
 * May be `async`.
 *
 * @callback Evaluator
 * @memberof module:cashshuffle/fetcher/persist
 *
 * @param message - Message to evaluate for acceptance.
 *
 * @return {Error=} Rejection reason. No value to indicate acceptance.
 *
 * @throws If any error occurs. Propagated as an error.
 */

/**
 * @memberof module:cashshuffle/fetcher/persist
 */
class PersistFetcher extends Fetcher {
  /**
   * @param {Inbox} inbox - Inbox to fetch from.
   * @param {Evaluator} evaluator - Message acceptance evaluator.
   */
  constructor (inbox, evaluator) {
    super()
    const priv = {
      inbox,
      evaluator
    }
    privs.set(this, priv)
  }
}

export default PersistFetcher
