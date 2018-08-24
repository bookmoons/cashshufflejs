/**
 * Authenticating message receiver.
 *
 * Receives `protocol.Signed` isntances.
 * Verifies the signature of the message.
 * Passes authenticated messages on to next receiver.
 * Discards messages that fail authentication.
 *
 * Provide protocol definition and next receiver.
 * Optionally provide `Receiver` instance to receive discarded messages.
 *
 * @module cashshuffle/receiver/authenticate
 */

import Receiver from './main'
import submit from './submit'

Object.assign(Receiver.prototype, {
  submit
})

export default Receiver
