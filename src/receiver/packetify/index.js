/**
 * Packetifying message receiver.
 *
 * Receives `protocol.Signed` instances.
 * Extracts contained `protocol.Packet` instance.
 * Passes on to next receiver.
 * Received messages are assumed valid.
 *
 * Provide protocol definition and next receiver.
 *
 * @module cashshuffle/receiver/packetify
 */

import Receiver from './main'

export default Receiver
