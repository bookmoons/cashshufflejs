import privs from './privs'

/**
 * @memberof module:cashshuffle/inchan/inchanbin
 *
 * @throws {FormatError} If received binary message fails to parse.
 */
class Inchan {
  /**
   * @param {inchanbin~Inchanbin} inchanbin - Binary input channel.
   *     Raw binary messages are read from this channel.
   */
  constructor (inchanbin) {
    const priv = {
      inchanbin
    }
    privs.set(this, priv)
  }
}

export default Inchan
