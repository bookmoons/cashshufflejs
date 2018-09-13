import privs from './privs'

/**
 * Participant inboxes.
 *
 * Index participant public key.
 * Value participant inbox.
 *
 * @var {Map<HexString,Inbox>} participantInboxes
 * @memberof module:cashshuffle/receiver/phase.PhaseReceiver
 * @instance
 */
function participantInboxes () {
  const priv = privs.get(this)
  const participantInboxesCopy = new Map(priv.inboxes)
  return participantInboxesCopy
}

export default participantInboxes
