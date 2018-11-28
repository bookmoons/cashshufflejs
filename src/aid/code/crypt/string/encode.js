import stringToUtf8 from '/aid/convert/string/utf8'

/**
 * Encode string for encryption.
 *
 * Encodes to UTF-8 without BOM.
 *
 * @memberof module:cashshuffle/aid/code
 *
 * @param {string} message - Message to encode.
 *
 * @return {Uint8Array} `message` encoded for encryption.
 */
function cryptEncodeString (message) {
  const messageEncoded = stringToUtf8(message)
  return messageEncoded
}

export default cryptEncodeString
