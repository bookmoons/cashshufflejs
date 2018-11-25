import { terminatorBytes } from '/protocol'
import bytesAt from '/aid/bytes/at'

/**
 * Find wire message terminator in byte string.
 *
 * @memberof module:cashshuffle/aid/find
 *
 * @implements {Finder}
 *
 * @param {Byte} byte - Element value.
 * @param {number} index - Element index.
 * @param {Uint8Array} bytes - Byte string. Not modified.
 *
 * @return {boolean} Whether `index` in `bytes` contains a wire message
 *     terminator. `true` if contains. `false` otherwise.
 */
function findBytesTerminator (byte, index, bytes) {
  const matched = bytesAt(bytes, index, terminatorBytes)
  return matched
}

export default findBytesTerminator
