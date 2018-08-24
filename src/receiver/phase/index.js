/**
 * Phase message receiver.
 *
 * Receives messages labeled for a specific phase.
 * Contains inbox for each participant.
 * Routes received message to inbox of sender.
 * Discards messages from unrecognized senders.
 *
 * Provide Iterable of all participant addresses as strings
 * and optionally Inbox constructor.
 *
 * Inbox defaults to `inbox/fifo`.
 *
 * @module cashshuffle/receiver/phase
 */

import Receiver from './main'
import submit from './submit'

Object.assign(Receiver.prototype, {
  submit
})

export default Receiver
