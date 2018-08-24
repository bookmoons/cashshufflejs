/**
 * Storing message receiver.
 *
 * Receives arrays of discard reason and discarded message.
 * Stores all messages to inbox.
 *
 * Optionally provide `Inbox` instance.
 * Defaults to new `inbox/fifo~Inbox` instance.
 *
 * @module cashshuffle/receiver/store
 */

import Receiver from './main'
import submit from './submit'

Object.assign(Receiver.prototype, {
  submit
})

export default Receiver
