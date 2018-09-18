/**
 * Convert `Uint8Array` to `Array` of `Byte`.
 *
 * @memberof module:cashshuffle/aid/convert
 *
 * @param {Uint8Array} bytes - Bytes to convert.
 *
 * @return {Array<Byte>} New `Array` containing bytes in `bytes`.
 */
function bytesToArray (bytes) {
  const bytesArray = [ ...bytes ]
  return bytesArray
}

export default bytesToArray
