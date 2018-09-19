import Outchanbin from '../base'
import privs from './privs'

/**
 * @memberof module:cashshuffle/outchanbin/nodestream
 *
 * @implements {Outchanbin}
 */
class NodeStreamOutchanbin extends Outchanbin {
  /**
   * @param {Writable<Buffer>} stream - Stream to write to.
   */
  constructor (stream) {
    super()
    const priv = {
      sending: false,
      stream
    }
    privs.set(this, priv)
  }
}

export default NodeStreamOutchanbin
