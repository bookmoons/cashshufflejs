/**
 * Objectifying message receiver.
 *
 * Receives `protocol.Packet` instances.
 * Converts to plain object.
 * Passes on to next receiver.
 * Received messages are assumed valid.
 *
 * Provide protocol definition and next receiver.
 *
 * @module cashshuffle/receiver/objectify
 */

import ObjectifyReceiver from './main'
import submit from './submit'

Object.assign(ObjectifyReceiver.prototype, {
  submit
})

Object.freeze(ObjectifyReceiver)

export default ObjectifyReceiver
