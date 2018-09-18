/**
 * Convert `Uint8Array` to `ArrayBuffer`.
 *
 * @memberof module:cashshuffle/util
 *
 * @param {Uint8Array} bytes - `Uint8Array` to convert.
 *
 * @return {ArrayBuffer} New `ArrayBuffer` containing only the bytes in
 *     `bytes`. This may be different than the backing `ArrayBuffer` which can
 *     can contain more data.
 */
function bytesToBuffer (bytes) {
  const bytesCopy = new Uint8Array(bytes)
  const buffer = bytesCopy.buffer
  return buffer
}

export default bytesToBuffer
