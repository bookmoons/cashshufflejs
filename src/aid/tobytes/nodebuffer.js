/**
 * Convert `Buffer` to `Uint8Array`.
 *
 * @memberof module:cashshuffle/aid
 *
 * @param {Buffer} nodeBuffer - `Buffer` to convert.
 *
 * @return {Uint8Array} New `Uint8Array` containing copy of `buffer`.
 */
function nodeBufferToBytes (nodeBuffer) {
  const length = nodeBuffer.length
  const bytes = new Uint8Array(length)
  for (let i = 0; i < length; i++) bytes[i] = nodeBuffer[i]
  return bytes
}

export default nodeBufferToBytes
