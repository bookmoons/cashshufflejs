import { terminatorBytes } from '../../protocol'
import concatenateBytes from '../bytes/concat'

/**
 * Delimit wire message.
 *
 * Adds delimiting for transfer in a byte stream.
 *
 * @param {WireMessage} message - Message to delimit. Not modified.
 *
 * @return {DelimitedWireMessage} `message` delimited for transfer in
 *     a byte stream.
 */
function delimitMessage (message) {
  const delimitedMessage = concatenateBytes([ message, terminatorBytes ])
  return delimitedMessage
}

export default delimitMessage
