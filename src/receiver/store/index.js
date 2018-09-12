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

import StoreReceiver from './main'
import submit from './submit'

Object.assign(StoreReceiver.prototype, {
  submit
})

export default StoreReceiver
