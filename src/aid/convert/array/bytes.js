import validateByte from '../../validate/byte'

/**
 * Convert `Array` of `Byte` to `Uint8Array`.
 *
 * @memberof module:cashshuffle/aid/convert
 *
 * @param {Array<Byte>} array - `Array` to convert.
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
