/**
 * Authenticating message receiver.
 *
 * Receives `protocol.Signed` isntances.
 * Verifies the signature of the message.
 * Passes authenticated messages on to next receiver.
 * Discards messages that fail authentication.
 *
 * Provide protocol definition and next receiver.
 *
 * @module cashshuffle/receiver/authenticate
 */

import Receiver from './main'

export default Receiver
