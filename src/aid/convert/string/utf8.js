import { encode } from 'utf8'
import arrayToBytes from '/aid/convert/array/bytes'
import byteStringToArray from '/aid/convert/bytestring/array'

/**
 * Convert string to UTF-8 bytes in a `Uint8Array`.
 *
 * @memberof module:cashshuffle/aid
 *
 * @param {string} string - String to convert.
 *
 * @param {Uint8Array} `Uint8Array` containing UTF-8 encoding of `string`
 */
function stringToUtf8 (string) {
  const byteString = encode(string)
  const bytesArray = byteStringToArray(byteString)
  const bytes = arrayToBytes(bytesArray)
  return bytes
}

export default stringToUtf8
