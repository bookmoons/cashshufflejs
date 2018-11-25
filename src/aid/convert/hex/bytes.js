import { FormatError } from '/error'

/**
 * Convert `HexString` to `Uint8Array`.
 *
 * @memberof module:cashshuffle/aid/convert
 *
 * @param {HexString} hex - `HexString` to convert.
 *
 * @return {Uint8Array} New `Uint8Array` containing bytes represented by `hex`.
 *
 * @throws {FormatError} If `hex` has an invalid length.
 *     Message `'invalid string length'`.
 * @throws {FormatError} If any byte representation cannot be converted.
 *     Message `'invalid hex byte'`.
 */
function hexToBytes (hex) {
  if ((hex.length % 2) !== 0) {
    throw new FormatError(
      { info: { length: hex.length } },
      'invalid string length'
    )
  }
  const length = hex.length / 2
  const bytes = new Uint8Array(length)
  for (
    let elementIndex = 0, characterIndex = 0;
    elementIndex < length;
    elementIndex += 1, characterIndex += 2
  ) {
    const byteString = hex.substring(characterIndex, characterIndex + 2)
    const byte = parseInt(byteString, 16)
    if (Number.isNaN(byte)) {
      throw new FormatError(
        { info: { byteString, characterIndex } },
        'invalid hex byte'
      )
    }
    bytes[elementIndex] = byte
  }
  return bytes
}

export default hexToBytes
