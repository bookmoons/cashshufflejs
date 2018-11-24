/**
 * Construct equivocation check hash input value.
 *
 * Format encryption keys in ascending shuffle order followed by output
 * addresses in observed message stream order all concatenated with no
 * delimiter.
 *
 * @memberof module:cashshuffle/aid/input
 *
 * @param {Iterable<HexString>} encryptionPublicKeys - Encryption public keys
 *     for shufflers 2 through last ascending in shuffle order.
 * @param {Iterable<Address>} outputList - Final output list
 *     in message stream order.
 */
function hashInput (encryptionPublicKeys, outputList) {
  return [ ...encryptionPublicKeys, ...outputList ].join('')
}

export default hashInput
