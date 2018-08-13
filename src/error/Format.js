import CashShuffleError from './CashShuffle'

/**
 * Format error.
 *
 * Thrown when a data item does not conform to an expected format.
 *
 * @memberof module:cashshuffle/error
 * @extends module:cashshuffle/error.CashShuffleError
 */
class FormatError extends CashShuffleError {
  /**
   * Error type name.
   *
   * @constant {string}
   * @default 'FormatError'
   */
  get name () {
    return 'FormatError'
  }
}

export default FormatError
