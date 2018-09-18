/**
 * Convert `ArrayBuffer` to `Uint8Array`.
 *
 * @memberof module:cashshuffle/util
 *
 * @param {ArrayBuffer} buffer - `ArrayBuffer` to convert.
 *
 * @return {Uint8Array} New `Uint8Array` providing access to the bytes of
 *     `buffer`.
 */
function bufferToBytes (buffer) {
  const bytes = new Uint8Array(buffer)
  return bytes
}

export default bufferToBytes