import stringToUtf8 from '/aid/convert/string/utf8'

/**
 * Encode string for encryption.
 *
 * Encodes to UTF-8 without BOM.
 *
 * @memberof module:cashshuffle/aid/code
 *
 * @param {string} string - String to encode.
 *
 * @return {Uint8Array} `string` encoded for encryption.
 */
function cryptEncodeString (string) {
  const bytes = stringToUtf8(string)
  return bytes
}

export default cryptEncodeString