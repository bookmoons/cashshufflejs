import { terminatorBuffer } from 'protocol'

/**
 * Delimit a message.
 *
 * Suffixes binary message with the wire delimiter.
 *
 * @param {Buffer} message - Message to delimit. Not modified.
 *
 * @return {Buffer} The delimited message.
 */
function delimit (message) {
  const frame = Buffer.concat([ message, terminatorBuffer ])
  return frame
}

export default delimit
