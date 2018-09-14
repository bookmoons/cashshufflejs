import CashShuffleError from './CashShuffle'

/**
 * Unavailable error.
 *
 * Thrown when an operation requires a resource that is unavailable.
 *
 * @memberof module:cashshuffle/error
 * @extends module:cashshuffle/error.CashShuffleError
 */
class UnavailableError extends CashShuffleError {
  /**
   * Error type name.
   *
   * @constant {string}
   * @default 'UnavailableError'
   */
  get name () {
    return 'UnavailableError'
  }
}

export default UnavailableError
