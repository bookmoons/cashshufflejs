import { FormatError, ValueError } from '../../error'

/**
 * Validate `ByteString`.
 *
 * Throws error if validation fails.
 * Returns without error if validation succeeds.
 *
 * @memberof module:cashshuffle/util
 *
 * @param {string} string - String to validate.
 *
 * @throws {ValueError} If `string` is not a string.
 *     Message starts `'invalid byte string'`.
 * @throws {FormatError} If `string` is not a valid `ByteString`.
 *     Message starts `'invalid byte string'`.
 */
function validateByteString (string) {
  if (typeof string !== 'string') {
    throw new ValueError(
      {
        cause: new TypeError('not string'),
        info: { string }
      },
      'invalid byte string'
    )
  }
  for (const character of string) {
    const codePoint = character.codePointAt(0)
    if (codePoint > 255) {
      throw new FormatError(
        {
          cause: new RangeError('code point over 255'),
          info: { character, codePoint }
        },
        'invalid byte string'
      )
    }
  }
}

export default validateByteString
