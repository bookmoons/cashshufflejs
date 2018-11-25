import { FormatError } from '/error'

const format = /^[a-zA-Z0-9+/_-]*={0,2}$/

/**
 * Validate `Base64` string.
 *
 * Throws error if validation fails.
 * Returns without error if validation succeeds.
 *
 * @memberof module:cashshuffle/aid/validate
 *
 * @param {string} string - String to validate.
 *
 * @throws {FormatError} If `string` is not valid `Base64`.
 *     Message `'invalid base64'`.
 */
function validateBase64 (string) {
  const valid = format.test(string)
  if (!valid) {
    throw new FormatError(
      { info: { string } },
      'invalid base64'
    )
  }
}

export default validateBase64
