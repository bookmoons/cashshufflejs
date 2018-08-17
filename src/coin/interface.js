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
