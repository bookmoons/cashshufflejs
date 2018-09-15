/**
 * Custom processing queue.
 *
 * Accepts custom processing procedure.
 *
 * @module cashshuffle/queue/custom
 */

import CustomQueue from './main'
import add from './add'
import empty from './empty'

Object.assign(CustomQueue.prototype, {
  add
})

Object.defineProperty(CustomQueue.prototype, 'empty', {
  get: empty
})

export default CustomQueue
