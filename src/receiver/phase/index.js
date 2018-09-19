/**
 * Phase message receiver.
 *
 * Receives messages labeled for a specific phase.
 * Contains inbox for each shuffler.
 * Routes received message to inbox of sender.
 * Discards messages from unrecognized senders.
 *
 * Provide:
 *
 * - Iterable of all shuffler public keys as hex strings.
 * - Optionally `Receiver` instance to receive discarded messages.
 * - Optionally factory function returning `Inbox` instances.
 *
 * Inbox defaults to `FifoInbox`.
 *
 * @module cashshuffle/receiver/phase
 */

import PhaseReceiver from './main'
import shufflerInboxes from './shuffler'
import submit from './submit'

Object.assign(PhaseReceiver.prototype, {
  submit
})

Object.defineProperty(PhaseReceiver.prototype, 'shufflerInboxes', {
  get: shufflerInboxes
})

Object.freeze(PhaseReceiver)

export default PhaseReceiver
