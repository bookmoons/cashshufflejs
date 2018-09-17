/**
 * Convert `Array` to `Uint8Array`.
 * @module cashshuffle/util/tobytes/array
 */

import validateByte from '../validate/byte'

/**
 * Convert `Array` to `Uint8Array`.
 *
 * @param {Array} array - `Array` to convert. Must contain number literals
 *     in range 0-255 inclusive.
 *
 * @return {Uint8Array} New `Uint8Array` containing bytes in `array`.
 */
function arrayToBytes (array) {
  const length = array.length
  const bytes = new Uint8Array(length)
  for (let i = 0; i < length; i++) {
    const byte = array[i]
    validateByte(byte)
    bytes[i] = byte
  }
  return bytes
}

export default arrayToBytes
