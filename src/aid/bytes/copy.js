/**
 * Copy `Uint8Array`.
 *
 * @memberof module:cashshuffle/aid/bytes
 *
 * @param {Uint8Array} bytes `Uint8Array` to copy.
 *
 * @return {Uint8Array} New `Uint8Array` containing copy of bytes in `bytes`.
 */
function copyBytes (bytes) {
  const bytesCopy = new Uint8Array(bytes)
  return bytesCopy
}

export default copyBytes
