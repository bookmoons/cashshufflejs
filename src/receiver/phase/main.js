import FifoInbox from '../../inbox/fifo'
import Receiver from '../base'
import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/phase
 */
class PhaseReceiver extends Receiver {
  /**
   * @param {Iterable<HexString>} shufflers - Shuffler public keys.
   * @param {Receiver} [discarder=] - Message receiver that handles
   *     discarded messages.
   * @param {function} [inboxFactory=] - Factory function providing
   *     `Inbox` instances.
   */
  constructor (shufflers, discarder = null, inboxFactory = null) {
    super()
    if (!inboxFactory) {
      inboxFactory = function produceFifoInbox () { return new FifoInbox() }
    }
    const shufflersSet = new Set(shufflers)
    const inboxes = new Map()
    for (const shuffler of shufflersSet) {
      inboxes.set(shuffler, inboxFactory())
    }
    const priv = {
      shufflers: shufflersSet,
      inboxes,
      discarder
    }
    privs.set(this, priv)
  }
}

export default PhaseReceiver
