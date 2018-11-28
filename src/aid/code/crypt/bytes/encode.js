import cryptEncodeString from '/aid/code/crypt/string/encode'
import bytesToBase64 from '/aid/convert/bytes/base64'

/**
 * Encode bytes for encryption.
 *
 * Encodes to `Base64` then to UTF-8 without BOM.
 *
 * @memberof module:cashshuffle/aid/code
 *
 * @param {Uint8Array} message - Message to encode. Not modified.
 *
 * @return {Uint8Array} `message` encoded for encryption.
 */
function cryptEncodeBytes (message) {
  const messageBase64 = bytesToBase64(message)
  const messageEncoded = cryptEncodeString(messageBase64)
  return messageEncoded
}

export default cryptEncodeBytes
