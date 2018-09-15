import Queue from '../base'
import privs from './privs'

/**
 * Processing procedure.
 *
 * Accepts data to process.
 * Return value ignored.
 *
 * @callback Processor
 *
 * @param data - Data to process.
 *
 * @throws If any error occurs. Propagated.
 */

/**
 * @memberof module:cashshuffle/queue/custom
 */
class CustomQueue extends Queue {
  /**
   * @param {Processor} processor - Processing procedure.
   */
  constructor (processor) {
    super()
    const priv = {
      processor,
      buffer: [],
      processing: false,
      stop: null
    }
    privs.set(this, priv)
  }
}

export default CustomQueue
