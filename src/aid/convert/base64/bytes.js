import { toByteArray } from 'base64-js'
import { FormatError } from '../../../error'
import arrayToBytes from '../array/bytes'
import validateBase64 from '../../validate/base64'

const invalidLengthMessage = 'Invalid string. Length must be a multiple of 4'

/**
 * Convert Base64 string to `Uint8Array`.
 *
 * @memberof module:cashshuffle/aid/convert
 *
 * @param {Base64} base64 - Base64 string to convert.
 *
 * @return {Uint8Array} New `Uint8Array` containing bytes
 *     represented by `base64`.
 *
 * @throws {FormatError} If `base64` is not valid Base64.
 *     Message starts `'invalid base64'`.
 */
function base64ToBytes (base64) {
  validateBase64(base64)
  const bytesArray = (function decodeBase64 () {
    try {
      return toByteArray(base64)
    } catch (e) {
      if (
        e instanceof Error &&
        e.message === invalidLengthMessage
      ) {
        throw new FormatError(e, 'invalid base64')
      } else throw e
    }
  })()
  const bytes = arrayToBytes(bytesArray)
  return bytes
}

export default base64ToBytes
