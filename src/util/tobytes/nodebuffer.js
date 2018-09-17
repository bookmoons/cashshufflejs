/**
 * Convert `Buffer` to `Uint8Array`.
 * @module cashshuffle/util/tobytes/buffer
 */

/**
 * Convert `Buffer` to `Uint8Array`.
 *
 * @param {Buffer} buffer - `Buffer` to convert.
 *
 * @return {Uint8Array} New `Uint8Array` containing copy of `buffer`.
 */
function nodeBufferToBytes (buffer) {
  const length = buffer.length
  const bytes = new Uint8Array(length)
  for (let i = 0; i < length; i++) bytes[i] = buffer[i]
  return bytes
}

export default nodeBufferToBytes
