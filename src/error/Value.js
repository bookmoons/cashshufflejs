import CashShuffleError from './CashShuffle'

/**
 * Value error.
 *
 * Thrown when an operation receives or encounters a bad value.
 *
 * @memberof module:cashshuffle/error
 * @extends module:cashshuffle/error.CashShuffleError
 */
class ValueError extends CashShuffleError {
  /**
   * Error type name.
   *
   * @constant {string}
   * @default 'ValueError'
   */
  get name () {
    return 'ValueError'
  }
}

export default ValueError
