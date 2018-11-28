import cryptDecodeString from '/aid/code/crypt/string/decode'
import base64ToBytes from '/aid/convert/base64/bytes'

/**
 * Decode bytes after decryption.
 *
 * Decodes from UTF-8 without BOM then from `Base64`.
 *
 * @memberof module:cashshuffle/aid/code
 *
 * @param {Uint8Array} messageEncoded - Encoded message to decode.
 *     Not modified.
 *
 * @return {Uint8Array} Bytes encoded by `messageEncoded`.
 */
function cryptDecodeBytes (messageEncoded) {
  const messageBase64 = cryptDecodeString(messageEncoded)
  const message = base64ToBytes(messageBase64)
  return message
}

export default cryptDecodeBytes
