import { fromByteArray } from 'base64-js'
import bytesToArray from '../convert/bytes/array'

/**
 * Convert `Uint8Array` to Base64 string.
 *
 * @memberof module:cashshuffle/aid
 *
 * @param {Uint8Array} bytes - Bytes to convert.
 *
 * @return {Base64} `Base64` representation of `bytes`.
 */
function bytesToBase64 (bytes) {
  const bytesArray = bytesToArray(bytes)
  const base64 = fromByteArray(bytesArray)
  return base64
}

export default bytesToBase64
