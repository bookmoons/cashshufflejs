import CashShuffleError from './CashShuffle'

/**
 * Functionality not implemented error.
 *
 * Thrown by methods in interface definitions to indicate functionality
 * that needs an implementation in subclasses.
 *
 * @memberof module:cashshuffle/error
 * @extends module:cashshuffle/error.CashShuffleError
 */
class NotImplementedError extends CashShuffleError {
  /**
   * Error type name.
   *
   * @constant {string}
   * @default 'NotImplementedError'
   */
  get name () {
    return 'NotImplementedError'
  }
}

export default NotImplementedError
