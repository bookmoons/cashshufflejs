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

import PacketifyReceiver from './main'
import submit from './submit'

Object.assign(PacketifyReceiver.prototype, {
  submit
})

export default PacketifyReceiver
