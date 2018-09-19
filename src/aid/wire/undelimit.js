import { FormatError } from '../../error'
import { terminatorByteLength, terminatorBytes } from '../../protocol'
import bytesEqual from '../bytes/equal'

/**
 * Undelimit wire message.
 *
 * Removes delimiting from a wire message.
 * Expects valid solitary delimited wire message.
 *
 * @param {DelimitedWireMessage} delimitedMessage - Delimited message to
 *     undelimit. Not modified.
 *
 * @return {WireMessage} `delimitedMessage` with delimiting removed.
 *
 * @throws {FormatError} If `delimitedMessage` is not a valid
 *     `DelimitedWireMessage`. Message `'invalid delimited wire message'`.
 */
function undelimitMessage (delimitedMessage) {
  const length = delimitedMessage.length

  // Detect shorter than delimiter
  if (length < terminatorByteLength) {
    throw new FormatError(
      {
        cause: new FormatError('shorter than delimiter'),
        info: { delimitedMessage, terminatorByteLength }
      },
      'invalid delimited wire message'
    )
  }

  // Detect bad delimiter
  const terminatorIndex = length - terminatorByteLength
  const terminatorFrame = new Uint8Array(
    delimitedMessage.buffer,
    terminatorIndex
  )
  if (!bytesEqual(terminatorFrame, terminatorBytes)) {
    throw new FormatError(
      {
        cause: new FormatError('invalid terminator'),
        info: { delimitedMessage, terminatorFrame }
      },
      'invalid delimited wire message'
    )
  }

  // Extract message
  const message = delimitedMessage.slice(0, terminatorIndex)
  return message
}

export default undelimitMessage
