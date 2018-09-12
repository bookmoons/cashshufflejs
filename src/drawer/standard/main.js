import Drawer from '../base'
import privs from './privs'

/**
 * @memberof module:cashshuffle/drawer/standard
 */
class StandardDrawer extends Drawer {
  /**
   * @param {Inchan} inchan - Message input channel.
   * @param {Receiver} receiver - Message receiver to relay messages to.
   */
  constructor (inchan, receiver) {
    super()
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

export default StandardDrawer
