import Outchan from '../base'
import privs from './privs'

/**
 * @memberof module:cashshuffle/outchan/outchanbin
 *
 * @implements {Outchan}
 */
class OutchanbinOutchan extends Outchan {
  /**
   * @param {outchanbin~Outchanbin} outchanbin - Binary output channel.
   *     Raw binary messages are delivered to this channel.
   * @param {protobufjs.Root} protocol - Protocol definition.
   */
  constructor (outchanbin, protocol) {
    super()
    const priv = {
      sending: false,
      outchanbin,
      protocol,
      Signed: protocol.Signed
    }
    privs.set(this, priv)
  }
}

export default OutchanbinOutchan
