import CashShuffleError from './CashShuffle'

/**
 * Timeout error.
 *
 * Thrown when an operation takes longer than the maximum allowed time.
 *
 * @memberof module:cashshuffle/error
 * @extends module:cashshuffle/error.CashShuffleError
 */
class TimeoutError extends CashShuffleError {
  /**
   * Error type name.
   *
   * @constant {string}
   * @default 'TimeoutError'
   */
  get name () {
    return 'TimeoutError'
  }
}

export default TimeoutError
