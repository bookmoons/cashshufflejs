import CashShuffleError from './CashShuffle'

/**
 * Exhaustion error.
 *
 * Thrown when an operation exhausts a specified limit without success.
 *
 * @memberof module:cashshuffle/error
 * @extends module:cashshuffle/error.CashShuffleError
 */
class ExhaustionError extends CashShuffleError {
  /**
   * Error type name.
   *
   * @constant {string}
   * @default 'ExhaustionError'
   */
  get name () {
    return 'ExhaustionError'
  }
}

export default ExhaustionError
