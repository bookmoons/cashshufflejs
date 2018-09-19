import Inchanbin from '../base'
import { MissingFeatureError } from '../../error'
import privs from './privs'

/**
 * @memberof module:cashshuffle/inchanbin/nodestream
 *
 * @implements {Inchanbin}
 */
class NodestreamInchanbin extends Inchanbin {
  /**
   * @param {Readable<Buffer>} stream - Stream to read from.
   *     Must support `unshift`.
   *
   * @throws {MissingFeatureError} If stream does not support `unshift`.
   */
  constructor (stream) {
    super()
    if (typeof stream.unshift !== 'function') {
      throw new MissingFeatureError('Stream must support unshift')
    }
    const priv = {
      receiving: false,
      buffer: [],
      stream
    }
    privs.set(this, priv)
  }
}

export default NodestreamInchanbin
