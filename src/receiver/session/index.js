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
 * - Iterable of all participant public keys as hex strings.
 * - Iterable of protocol message phase identifiers.
 * - Optionally `Receiver` instance to receive discarded messages.
 * - Optionally factory function returning phase receiver instances.
 *
 * Default phase receiver uses provided participants and discarder.
 *
 * @module cashshuffle/receiver/session
 */

import Receiver from './main'
import phaseReceivers from './phase'
import submit from './submit'

Object.assign(Receiver.prototype, {
  submit
})

Object.defineProperty(Receiver.prototype, 'phaseReceivers', {
  get: phaseReceivers
})

export default Receiver
