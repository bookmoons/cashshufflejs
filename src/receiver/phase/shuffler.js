import privs from './privs'

/**
 * Shuffler inboxes.
 *
 * Index shuffler public key.
 * Value shuffler inbox.
 *
 * @var {Map<HexString,Inbox>} shufflerInboxes
 * @memberof module:cashshuffle/receiver/phase.PhaseReceiver
 * @instance
 */
function shufflerInboxes () {
  const priv = privs.get(this)
  const shufflerInboxesCopy = new Map(priv.inboxes)
  return shufflerInboxesCopy
}

export default shufflerInboxes
