import bytesToHex from '/aid/convert/bytes/hex'

/**
 * Encode key for transfer.
 *
 * Encodes to `HexString`.
 *
 * @memberof module:cashshuffle/aid/code
 *
 * @param {Uint8Array} key - Key. Not modified.
 *
 * @return {HexString} `key` encoded for transfer.
 */
function transferEncodeKey (key) {
  const keyEncoded = bytesToHex(key)
  return keyEncoded
}

export default transferEncodeKey
