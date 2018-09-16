/**
 * Convert `Uint8Array` to `HexString`.
 * @module cashshuffle/util/tohex/bytes
 */

/**
 * Convert `Uint8Array` to `HexString`.
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
