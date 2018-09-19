/**
 * Reduce `Byte` to `ByteString`.
 *
 * Assumes valid `byte`s.
 * Use initial value empty string `''`.
 *
 * @memberof module:cashshuffle/aid/reduce
 *
 * @implements {Reducer}
 *
 * @param {ByteString} byteString - Constructed `ByteString`.
 * @param {Byte} byte - `Byte` to reduce. Assumed valid.
 *
 * @return {ByteString} `byteString` with `byte` appended.
 */
function byteToByteString (byteString, byte) {
  const character = String.fromCodePoint(byte)
  byteString += character
  return byteString
}

export default byteToByteString
