import { MissingValueError } from '../../error'
import { terminatorByteLength } from '../../protocol'
import findBytesTerminator from '../find/bytes/terminator'

/**
 * Find delimited wire message in a byte string.
 *
 * @memberof module:cashshuffle/wire
 *
 * @param {Uint8Array} bytes - Bytes to find message in.
 *
 * @return {number} Index of end of first delimited wire message in `bytes`.
 *
 * @throws {MissingValueError} If no delimited wire message is found
 *     in `bytes`. Message `'delimited message'`.
 */
function findMessage (bytes) {
  const terminatorIndex = bytes.findIndex(findBytesTerminator)
  if (terminatorIndex === -1) throw new MissingValueError('delimited message')
  const endIndex = terminatorIndex + terminatorByteLength - 1
  return endIndex
}

export default findMessage
