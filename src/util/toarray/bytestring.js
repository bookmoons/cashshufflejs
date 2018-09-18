import validateByteString from '../validate/bytestring'

/**
 * Convert `ByteString` to `Array` of `Byte`.
 *
 * @memberof module:cashshuffle/util
 *
 * @param {ByteString} byteString - `ByteString` to convert.
 *
 * @return {Array<Byte>} New `Array` containing bytes in `byteString`.
 *
 * @throws {ValueError} If `byteString` is not a valid `ByteString`.
 *     Message starts with `'invalid byte string'`.
 */
function byteStringToArray (byteString) {
  validateByteString(byteString)
  const bytesArray = []
  for (const character of byteString) {
    const codePoint = character.codePointAt()
    bytesArray.push(codePoint)
  }
  return bytesArray
}

export default byteStringToArray
