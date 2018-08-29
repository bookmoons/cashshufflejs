import privs from './privs'

/**
 * Participant inboxes.
 *
 * Index participant public key as hex string.
 * Value participant inbox.
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
