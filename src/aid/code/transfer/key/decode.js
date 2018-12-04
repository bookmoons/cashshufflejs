import hexToBytes from '/aid/convert/hex/bytes'

/**
 * Decode key after transfer.
 *
 * Decodes from `HexString`.
 *
 * @memberof module:cashshuffle/aid/code
 *
 * @param {HexString} keyEncoded - Encoded key. Not modified.
 *
 * @return {Uint8Array} Key encoded by `keyEncoded`.
 */
function transferDecodeKey (keyEncoded) {
  const key = hexToBytes(keyEncoded)
  return key
}

export default transferDecodeKey
