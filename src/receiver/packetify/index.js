/**
 * Packetifying message receiver.
 *
 * Receives `protocol.Signed` instances.
 * Extracts contained `protocol.Packet` instance.
 * Passes on to next receiver.
 * Received messages are assumed valid.
 *
 * Provide protocol definition and next receiver.
 * Optionally provide `Receiver` instance to receive discarded messages.
 *
 * @module cashshuffle/receiver/packetify
 */

import Receiver from './main'
import submit from './submit'

Object.assign(Receiver.prototype, {
  submit
})

export default Receiver
