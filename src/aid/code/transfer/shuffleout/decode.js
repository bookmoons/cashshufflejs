import base64ToBytes from '/aid/convert/base64/bytes'

/**
 * Decode shuffle output list item after transfer.
 *
 * Decodes from `Base64`.
 *
 * @memberof module:cashshuffle/aid/code
 *
 * @param {Base64} itemEncoded - Encoded shuffle output list item.
 *
 * @return {Uint8Array} Shuffle output list item encoded by `itemEncoded`.
 */
function transferDecodeShuffleOutput (itemEncoded) {
  const item = base64ToBytes(itemEncoded)
  return item
}

export default transferDecodeShuffleOutput
