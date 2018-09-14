import FifoInbox from '../../inbox/fifo'
import Receiver from '../base'
import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/phase
 */
class PhaseReceiver extends Receiver {
  /**
   * @param {Iterable<HexString>} participants - Participant public keys.
   * @param {Receiver} [discarder=] - Message receiver that handles
   *     discarded messages.
   * @param {function} [inboxFactory=] - Factory function providing
   *     `Inbox` instances.
   */
  constructor (participants, discarder = null, inboxFactory = null) {
    super()
    if (!inboxFactory) {
      inboxFactory = function produceFifoInbox () { return new FifoInbox() }
    }
    const participantsSet = new Set(participants)
    const inboxes = new Map()
    for (const participant of participantsSet) {
      inboxes.set(participant, inboxFactory())
    }
    const priv = {
      participants: participantsSet,
      inboxes,
      discarder
    }
    privs.set(this, priv)
  }
}

export default PhaseReceiver
