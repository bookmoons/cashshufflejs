/**
 * Convert `Uint8Array` to `ByteString`.
 *
 * @memberof module:cashshuffle/aid/convert
 *
 * @param {Uint8Array} bytes - Bytes to convert. Not modified.
 *
 * @return {ByteString} New `ByteString` containing bytes in `bytes`.
 */
function bytesToByteString (bytes) {
  let byteString = ''
  for (const byte of bytes) {
    const character = String.fromCodePoint(byte)
    byteString += character
  }
  return byteString
}

export default bytesToByteString
