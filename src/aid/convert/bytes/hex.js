/**
 * Convert `Uint8Array` to `HexString`.
 *
 * @memberof module:cashshuffle/aid/convert
 *
 * @param {Uint8Array} bytes - Bytes to convert.
 *
 * @return {HexString} `HexString` representing bytes in `bytes`.
 */
function bytesToHex (bytes) {
  let hex = ''
  for (const byte of bytes) {
    const byteString = byte.toString(16)
    const byteElement = byteString.padStart(2, '0')
    hex += byteElement
  }
  return hex
}

export default bytesToHex
