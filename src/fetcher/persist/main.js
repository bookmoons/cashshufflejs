import Fetcher from '../base'
import privs from './privs'

/**
 * Message acceptance evaluator.
 *
 * May be `async`.
 *
 * @callback Evaluator
 * @memberof module:cashshuffle/fetcher/each
 *
 * @param message - Message to evaluate for acceptance.
 *
 * @return {boolean} Whether to accept message.
 *     True for accept. False for reject.
 *
 * @throws If any error occurs. Propagated as an error.
 */

/**
 * @memberof module:cashshuffle/fetcher/each
 */
class PersistFetcher extends Fetcher {
  /**
   * @param {Inbox} inbox - Inbox to fetch from.
   * @param {Evaluator} evaluator - Message acceptance evaluator.
   * @param {number} attempts - Maximum attempts. Positive integer.
   */
  constructor (inbox, evaluator, attempts) {
    super()
    const priv = {
      inbox,
      evaluator,
      attempts
    }
    privs.set(this, priv)
  }
}

export default PersistFetcher
