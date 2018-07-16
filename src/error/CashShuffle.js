/**
 * Base cashshuffle error.
 * @module cashshuffle/error/CashShuffle
 */

import { VError } from 'verror'

class CashShuffleError extends VError {
  get name () {
    return 'CashShuffleError'
  }
}

export default CashShuffleError
