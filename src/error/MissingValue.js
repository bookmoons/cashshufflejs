import CashShuffleError from './CashShuffle'

/**
 * Required value missing error.
 *
 * Thrown when an operation requires a value that is not available.
 *
 * @memberof module:cashshuffle/error
 * @extends module:cashshuffle/error.CashShuffleError
 * @see The [verror docs](https://www.npmjs.com/package/verror#constructors)
 *     for constructor parameters.
 */
class MissingValueError extends CashShuffleError {
  /**
   * Error type name.
   *
   * @constant {string}
   * @default 'MissingValueError'
   */
  get name () {
    return 'MissingValueError'
  }
}

export default MissingValueError
