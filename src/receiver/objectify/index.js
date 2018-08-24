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

import Receiver from './main'
import submit from './submit'

Object.assign(Receiver.prototype, {
  submit
})

export default Receiver
