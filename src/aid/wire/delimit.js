import { terminatorBytes } from '../../protocol'
import concatenateBytes from '../bytes/concat'

/**
 * Delimit wire message.
 *
 * Adds delimiting for transfer in a byte stream.
 *
 * Terminates message with the Unicode character [U+23C3 Return Symbol][1]
 * in UTF-8 without BOM. That encodes to the 3 byte sequence `e2 8f 8e`.
 *
 * [1]: https://codepoints.net/U+23CE
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
