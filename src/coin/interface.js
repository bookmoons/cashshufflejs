/**
 * Bitcoin Cash network operations.
 * @module cashshuffle/coin
 */

/**
 * Bitcoin Cash network operations.
 *
 * @interface Coin
 */

/**
 * Get P2PKH address for public key.
 *
 * @method address
 * @memberof module:cashshuffle/coin~Coin
 * @instance
 * @async
 *
 * @param {string} publicKeyString - Public key as hex string.
 *
 * @return {string} P2PKH address for the public key.
 */

/**
 * Verify address has sufficient funds.
 *
 * @method sufficientFunds
 * @memberof module:cashshuffle/coin~Coin
 * @instance
 * @async
 *
 * @param {string} address - Bitcoin Cash address to check.
 * @param {number} amount - Required amount in satoshis.
 *
 * @return {boolean} Whether address has sufficient funds. True if address
 *     has the given amount or more.
 */

/**
 * Verify message signature.
 *
 * @method verifySignature
 * @memberof module:cashshuffle/coin~Coin
 * @instance
 * @async
 *
 * @param {string} signature - Message signature as Base64 encoded string.
 * @param {string} message - Plaintext message.
 * @param {string} publicKeyString - Signer public key as hex string.
 *
 * @return {boolean} Whether the signature is valid. True if from the named
 *     signer and for the given message.
 */
