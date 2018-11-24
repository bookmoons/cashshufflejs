import utf8ToString from '../../../convert/utf8/string'

/**
 * Decode string after decryption.
 *
 * Decodes from UTF-8 without BOM.
 *
 * @memberof module:cashshuffle/aid/encrypt
 *
 * @param {Uint8Array} bytes - Encoded string to decode. Not modified.
 *
 * @return {string} String encoded by `bytes`.
 */
function decodeString (bytes) {
  const string = utf8ToString(bytes)
  return string
}

export default decodeString
