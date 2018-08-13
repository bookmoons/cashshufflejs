/**
 * `Buffer` to `ArrayBuffer` conversion.
 *
 * @module cashshuffle/util/toarraybuffer
 */

import toArrayBufferAlias from 'to-arraybuffer'

/**
 * Convert a Node.js `Buffer` into an `ArrayBuffer`.
 *
 * Returned value is a copy of the original structure.
 *
 * @param {Buffer} buffer - Buffer to convert.
 *
 * @return {ArrayBuffer} Buffer converted to ArrayBuffer.
 */
function toArrayBuffer (buffer) {
  const binaryAlias = toArrayBufferAlias(buffer)
  const binary = binaryAlias.slice(0)
  return binary
}

export default toArrayBuffer
