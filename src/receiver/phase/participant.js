import privs from './privs'

/**
 * Participant public key indexed map of participant inboxes.
 *
 * @var {Map} participantInboxes
 * @memberof module:cashshuffle/receiver/phase.Receiver
 * @instance
 */
function participantInboxes () {
  const priv = privs.get(this)
  const participantInboxesCopy = new Map(priv.inboxes)
  return participantInboxesCopy
}

export default participantInboxes
