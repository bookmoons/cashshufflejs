/**
 * Validating message receiver.
 *
 * Receives `protocol.Signed` instances.
 * Validates message with protobufjs.
 * Discards invalid messages.
 * Passes valid messages on to next receiver.
 *
 * Provide protocol definition and next receiver.
 *
 * @module cashshuffle/receiver/validate
 */

import Receiver from './main'

export default Receiver
