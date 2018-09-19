/**
 * Node.js stream based implementation of Inchanbin.
 *
 * Uses Node.js [Readable][1] object to receive data.
 * Expects a stream of `Buffer` objects.
 *
 * Provide `Readable` instance to constructor.
 *
 * [1]: https://nodejs.org/dist/latest/docs/api/stream.html
 *
 * @module cashshuffle/inchanbin/nodestream
 */

import NodeStreamInchanbin from './main'
import receive from './receive'

Object.assign(NodeStreamInchanbin.prototype, {
  receive
})

Object.freeze(NodeStreamInchanbin)

export default NodeStreamInchanbin
