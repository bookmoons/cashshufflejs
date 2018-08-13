import privs from './privs'

/**
 * @memberof module:cashshuffle/outchanbin/nodestream
 */
class Outchanbin {
  /**
   * @param {Writable<Buffer>} stream - Stream to write to.
   */
  constructor (stream) {
    const priv = {
      sending: false,
      stream
    }
    privs.set(this, priv)
  }
}

export default Outchanbin
