import utf8ToString from '/aid/convert/utf8/string'

/**
 * Decode string after decryption.
 *
 * Decodes from UTF-8 without BOM.
 *
 * @memberof module:cashshuffle/aid/code
 *
 * @param {Uint8Array} messageEncoded - Encoded message to decode.
 *     Not modified.
 *
 * @return {string} String encoded by `bytes`.
 */
function cryptDecodeString (messageEncoded) {
  const message = utf8ToString(messageEncoded)
  return message
}

export default cryptDecodeString
