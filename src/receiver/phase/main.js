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
   * @param {function} [Inbox=<fifo>] - Constructor for preferred inbox type.
   */
  constructor (participants, discarder = null, Inbox = FifoInbox) {
    const participantsSet = new Set(participants)
    const inboxes = new Map()
    for (const participant of participantsSet) {
      inboxes.set(participant, new Inbox())
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
