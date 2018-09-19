/**
 * Node.js stream based implementation of Outchanbin.
 *
 * Uses Node.js [Writable][1] object to send data.
 * Delivers data as `Buffer` objects.
 *
 * Provide `Writable` instance to constructor.
 *
 * [1]: https://nodejs.org/dist/latest/docs/api/stream.html
 *
 * @module cashshuffle/outchanbin/nodestream
 */

import NodestreamOutchanbin from './main'
import send from './send'

Object.assign(NodestreamOutchanbin.prototype, {
  send
})

Object.freeze(NodestreamOutchanbin)

export default NodestreamOutchanbin
