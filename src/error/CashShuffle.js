import { VError } from 'verror'

/**
 * Base class for cashshuffle errors.
 *
 * You can detect all cashshuffle errors with `e instanceof CashShuffleError`.
 *
 * @memberof module:cashshuffle/error
 * @extends module:verror.VError
 * @see {@link https://www.npmjs.com/package/verror#constructors}
 *     for constructor parameters.
 */
class CashShuffleError extends VError {
  /**
   * Error type name.
   *
   * @constant {string}
   * @default 'CashShuffleError'
   */
  get name () {
    return 'CashShuffleError'
  }
}

export default CashShuffleError
