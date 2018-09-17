import CashShuffleError from './CashShuffle'

/**
 * Empty error.
 *
 * Thrown when an operation requiring a nonempty resource finds it empty.
 *
 * @memberof module:cashshuffle/error
 * @extends module:cashshuffle/error.CashShuffleError
 */
class EmptyError extends CashShuffleError {
  /**
   * Error type name.
   *
   * @constant {string}
   * @default 'EmptyError'
   */
  get name () {
    return 'EmptyError'
  }
}

export default EmptyError
