import CashShuffleError from './CashShuffle'

/**
 * Missing feature error.
 *
 * Thrown when an operation requires a feature that is not available.
 *
 * @memberof module:cashshuffle/error
 * @extends module:cashshuffle/error.CashShuffleError
 */
class MissingFeatureError extends CashShuffleError {
  /**
   * Error type name.
   *
   * @constant {string}
   * @default 'MissingFeatureError'
   */
  get name () {
    return 'MissingFeatureError'
  }
}

export default MissingFeatureError
