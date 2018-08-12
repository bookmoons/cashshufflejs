import CashShuffleError from './CashShuffle'

/**
 * Feature missing error.
 *
 * Thrown when an operation requires a feature that is not available.
 *
 * @memberof module:cashshuffle/error
 * @extends module:cashshuffle/error.CashShuffleError
 */
class FeatureMissingError extends CashShuffleError {
  /**
   * Error type name.
   *
   * @constant {string}
   * @default 'FeatureMissingError'
   */
  get name () {
    return 'FeatureMissingError'
  }
}

export default FeatureMissingError
