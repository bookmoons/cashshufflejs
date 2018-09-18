import { decode } from 'utf8'
import { FormatError } from '../../../error'
import bytesToByteString from '../bytes/bytestring'

const loneSurrogateMessageStart = 'Lone surrogate'
const errorMessages = [
  'Invalid byte index',
  'Invalid continuation byte',
  'Invalid UTF-8 detected'
]

/**
 * Convert UTF-8 bytes in a `Uint8Array` to string.
 *
 * @memberof module:cashshuffle/aid/convert
 *
 * @param {Uint8Array} utf8 - `Uint8Array` containing UTF-8 bytes.
 *
 * @return {string} String encoded by `utf8`.
 *
 * @throws {FormatError} If `utf8` is not valid UTF-8.
 *     Message `'invalid utf8'`.
 */
function utf8ToString (utf8) {
  const byteString = bytesToByteString(utf8)
  const string = (function decodeUtf8 () {
    try {
      return decode(byteString)
    } catch (e) {
      if (
        e.message.startsWith(loneSurrogateMessageStart) ||
        errorMessages.includes(e.message)
      ) {
        throw new FormatError(
          { cause: e, info: { bytes: utf8 } },
          'invalid utf8'
        )
      } else throw e
    }
  })()
  return string
}

export default utf8ToString
