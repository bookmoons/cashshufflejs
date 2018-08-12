import CashShuffleError from './CashShuffle'

/**
 * Busy error.
 *
 * Thrown when an operation requires a resource that is busy.
 *
 * @memberof module:cashshuffle/error
 * @extends module:cashshuffle/error.CashShuffleError
 */
class BusyError extends CashShuffleError {
  /**
   * Error type name.
   *
   * @constant {string}
   * @default 'BusyError'
   */
  get name () {
    return 'BusyError'
  }
}

export default BusyError
