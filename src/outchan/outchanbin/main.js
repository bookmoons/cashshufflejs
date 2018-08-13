import privs from './privs'

/**
 * @memberof module:cashshuffle/outchan/outchanbin
 */
class Outchan {
  /**
   * @param {outchanbin~Outchanbin} outchanbin - Binary output channel.
   *     Raw binary messages are delivered to this channel.
   * @param {protobufjs.Root} protocol - Protocol definition.
   */
  constructor (outchanbin, protocol) {
    const priv = {
      sending: false,
      outchanbin,
      protocol,
      Signed: protocol.Signed
    }
    privs.set(this, priv)
  }
}

export default Outchan
