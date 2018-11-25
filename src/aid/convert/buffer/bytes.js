import copyBuffer from '/aid/buffer/copy'

/**
 * Convert `ArrayBuffer` to `Uint8Array`.
 *
 * @memberof module:cashshuffle/aid/convert
 *
 * @param {ArrayBuffer} buffer - `ArrayBuffer` to convert. Not modified.
 *
 * @return {Uint8Array} New `Uint8Array` containing a copy of the bytes
 *     in `buffer`.
 */
function bufferToBytes (buffer) {
  const bufferCopy = copyBuffer(buffer)
  const bytes = new Uint8Array(bufferCopy)
  return bytes
}

export default bufferToBytes
