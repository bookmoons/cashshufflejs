import { ValueError } from 'error'
import { terminatorByteLength, terminatorNodeBuffer } from 'protocol'

/**
 * @typedef {Array} UndelimitReturn
 * @memberof module:cashshuffle/sim/server/session.SessionServerSimulator
 *
 * @prop {Buffer} 1 - Undelimited message.
 * @prop {Buffer} 2 - Data chunk with undelimited message removed.
 *
 * @example
const message = Buffer.from([ 0x01, 0x02, 0x03 ])
const newData = Buffer.from([ 0x04, 0x05 ])
const undelimitReturn = [ message, newData ]
 */

/**
 * Undelimit a single message.
 *
 * Extracts a single delimited message from a binary data chunk.
 * Extracts from the front of the chunk.
 * Extracted message delivered without delimiter.
 *
 * @param {Buffer} data - Data chunk to undelimit from. Not modified.
 *
 * @return {UndelimitReturn} The undelimited message and new data chunk.
 *
 * @throws {ValueError} If data chunk contains no valid delimited message.
 *     Message `'no delimited message'`.
 */
function undelimit (data) {
  const index = data.indexOf(terminatorNodeBuffer)
  if (index === -1) throw new ValueError('no delimited message')
  const message = data.slice(0, index)
  const newDataIndex = index + terminatorByteLength
  const newData = data.slice(newDataIndex)
  return [ message, newData ]
}

export default undelimit
