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
   * @param {protobufjs.Root} protocol - Protocol definition.
   */
  constructor (inchanbin, protocol) {
    const priv = {
      inchanbin,
      protocol,
      Signed: protocol.Signed
    }
    privs.set(this, priv)
  }
}

export default Inchan
