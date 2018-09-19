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
 * @param message - Message to evaluate for acceptance. Not modified.
 *
 * @return {(Error|undefined)} Rejection reason.
 *     No value to indicate acceptance.
 *
 * @throws If any error occurs. Propagated as an error.
 */

/**
 * @memberof module:cashshuffle/fetcher/persist
 *
 * @implements {Fetcher}
 */
class PersistFetcher extends Fetcher {
  /**
   * @param {Inbox} inbox - Inbox to fetch from.
   * @param {Evaluator} evaluator - Message acceptance evaluator. Not modified.
   * @param {Discarder} [discarder=] - Discarded message handler.
   */
  constructor (inbox, evaluator, discarder = null) {
    super()
    const priv = {
      inbox,
      evaluator,
      discarder
    }
    privs.set(this, priv)
  }
}

export default PersistFetcher
