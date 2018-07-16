/**
 * Message encryption.
 * @module cashshuffle/crypto
 */

/**
 * Message encryption functions.
 *
 * Supports key generation, encryption, decryption, and hashing.
 *
 * @interface Crypto
 */

/**
 * Generate key pair for message encryption.
 *
 * Generated key pair is saved internally and used for subsequent operations.
 * No return value. Subsequent calls discard and replace old key pair.
 *
 * @method generateKeyPair
 * @memberof module:cashshuffle/crypto~Crypto
 * @instance
 */

/**
 * Hash a string with SHA-224.
 *
 * @method hash
 * @memberof module:cashshuffle/crypto~Crypto
 * @instance
 *
 * @param {string} text - Text to hash.
 *
 * @return {ArrayBuffer} SHA-224 hash of the text.
 */
