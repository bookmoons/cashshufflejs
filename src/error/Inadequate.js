import CashShuffleError from './CashShuffle'

/**
 * Inadequate error.
 *
 * Thrown when an inadequate amount of a required resource is available.
 *
 * @memberof module:cashshuffle/error
 * @extends module:cashshuffle/error.CashShuffleError
 */
class InadequateError extends CashShuffleError {
  /**
   * Error type name.
   *
   * @constant {string}
   * @default 'InadequateError'
   */
  get name () {
    return 'InadequateError'
  }
}

export default InadequateError
