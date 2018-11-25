import utf8ToString from '/aid/convert/utf8/string'

/**
 * Decode string after decryption.
 *
 * Decodes from UTF-8 without BOM.
 *
 * @memberof module:cashshuffle/aid/code
 *
 * @param {Uint8Array} bytes - Encoded string to decode. Not modified.
 *
 * @return {string} String encoded by `bytes`.
 */
function cryptDecodeString (bytes) {
  const string = utf8ToString(bytes)
  return string
}

export default cryptDecodeString
