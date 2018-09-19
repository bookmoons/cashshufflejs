import Drawer from '../base'
import privs from './privs'

/**
 * @memberof module:cashshuffle/drawer/standard
 *
 * @implements {Drawer}
 */
class StandardDrawer extends Drawer {
  /**
   * @param {Inchan} inchan - Message input channel.
   * @param {Receiver} receiver - Message receiver to relay messages to.
   * @param {Logchan} [log=] - Logging channel.
   */
  constructor (inchan, receiver, log = null) {
    super()
    const priv = {
      drawing: false,
      runToken: null,
      cancel: null,
      watch: null,
      resolveWatch: null,
      rejectWatch: null,
      inchan,
      receiver,
      log
    }
    privs.set(this, priv)
  }
}

export default StandardDrawer
