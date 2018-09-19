/**
 * Session message receiver.
 *
 * Receives messages during a session.
 * Contains a phase receiver for each phase.
 * Routes received message to receiver of its phase.
 * Discards messages with unrecognized phases.
 *
 * Provide:
 *
 * - Iterable of all shuffler public keys as hex strings.
 * - Iterable of protocol message phase identifiers.
 * - Optionally `Receiver` instance to receive discarded messages.
 * - Optionally factory function returning phase receiver instances.
 *
 * Default phase receiver uses provided shufflers and discarder.
 *
 * @module cashshuffle/receiver/session
 */

import SessionReceiver from './main'
import phaseReceivers from './phase'
import submit from './submit'

Object.assign(SessionReceiver.prototype, {
  submit
})

Object.defineProperty(SessionReceiver.prototype, 'phaseReceivers', {
  get: phaseReceivers
})

Object.freeze(SessionReceiver)

export default SessionReceiver
