import Inchan from '../base'
import privs from './privs'

/**
 * @memberof module:cashshuffle/inchan/inchanbin
 *
 * @implements {Inchan}
 */
class InchanbinInchan extends Inchan {
  /**
   * @param {inchanbin~Inchanbin} inchanbin - Binary input channel.
   *     Raw binary messages are read from this channel.
   * @param {protobufjs.Root} protocol - Protocol definition.
   */
  constructor (inchanbin, protocol) {
    super()
    const priv = {
      inchanbin,
      protocol,
      Signed: protocol.Signed
    }
    privs.set(this, priv)
  }
}

export default InchanbinInchan
