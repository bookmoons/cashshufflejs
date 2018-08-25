import FifoInbox from '../../inbox/fifo'
import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/phase
 */
class Receiver {
  /**
   * @param {Iterable<string>} participants - Participant public keys
   *     as hex strings.
   * @param {Receiver} [discarder=null] - Message receiver that handles
   *     discarded messages.
   * @param {function} [inboxFactory=null] - Factory function providing
   *     `Inbox` instances.
   */
  constructor (participants, discarder = null, inboxFactory = null) {
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

export default Receiver
