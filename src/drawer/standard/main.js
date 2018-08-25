import privs from './privs'

/**
 * @memberof module:cashshuffle/drawer/standard
 */
class Drawer {
  /**
   * @param {Inchan} inchan - Message input channel.
   * @param {Receiver} receiver - Message receiver to relay messages to.
   */
  constructor (inchan, receiver) {
    const priv = {
      drawing: false,
      runToken: null,
      cancel: null,
      watch: null,
      resolveWatch: null,
      rejectWatch: null,
      inchan,
      receiver
    }
    privs.set(this, priv)
  }
}

export default Drawer
