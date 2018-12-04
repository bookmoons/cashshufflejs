import bytesToBase64 from '/aid/convert/bytes/base64'

/**
 * Encode shuffle output list item for transfer.
 *
 * Encodes to `Base64`.
 *
 * @memberof module:cashshuffle/aid/code
 *
 * @param {Uint8Array} item - Shuffle output list item. Not modified.
 *
 * @return {Base64} `item` encoded for transfer.
 */
function transferEncodeShuffleOutput (item) {
  const itemEncoded = bytesToBase64(item)
  return itemEncoded
}

export default transferEncodeShuffleOutput
