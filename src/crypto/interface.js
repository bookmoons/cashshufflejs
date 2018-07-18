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
 * Encrypt message for public key.
 *
 * Performs [ECIES][1] encryption. Parameters:
 * - Symmetric encryption scheme `AES-128-CBC`.
 * - Message authentication code `HMAC-SHA256`.
 *
 * [1]: https://cryptopp.com/wiki/Elliptic_Curve_Integrated_Encryption_Scheme
 *
 * @method encrypt
 * @memberof module:cashshuffle/crypto~Crypto
 * @instance
 * @async
 *
 * @param {string} message - Message to encrypt.
 * @param {string} recipient - Public key of recipient as hex string.
 *
 * @return {string} The encrypted message.
 */

/**
 * Export private key as hex string.
 *
 * Generate or restore key pair prior to use.
 *
 * @method exportPrivateKey
 * @memberof module:cashshuffle/crypto~Crypto
 * @instance
 * @async
 *
 * @return {string} Private key as hex string.
 *
 * @throws {MissingValueError} If key pair has not been generated or restored.
 */

/**
 * Export public key as hex string.
 *
 * Generate or restore key pair prior to use.
 *
 * @method exportPublicKey
 * @memberof module:cashshuffle/crypto~Crypto
 * @instance
 * @async
 *
 * @return {string} Public key as hex string.
 *
 * @throws {MissingValueError} If key pair has not been generated or restored.
 */

/**
 * Generate ECDSA key pair for message encryption.
 *
 * Generated key pair is saved internally and used for subsequent operations.
 * No return value. Subsequent calls discard and replace old key pair.
 *
 * @method generateKeyPair
 * @memberof module:cashshuffle/crypto~Crypto
 * @instance
 * @async
 *
 * @param {number} [network=mainnet] - Network to generate for.
 */

/**
 * Hash a string with SHA-224.
 *
 * @method hash
 * @memberof module:cashshuffle/crypto~Crypto
 * @instance
 * @async
 *
 * @param {string} text - Text to hash.
 *
 * @return {ArrayBuffer} SHA-224 hash of the text.
 */

/**
 * Restore key pair from private key hex string.
 *
 * @method restoreKeyPair
 * @memberof module:cashshuffle/crypto~Crypto
 * @instance
 * @async
 *
 * @param {string} privateKeyString - Private key as hex string.
 * @param {boolean} [compressed=true] - Whether to encode with compressed flag.
 *     Causes wallets to generate a compressed public key.
 * @param {number} [version=0x80] - Version to encode. Default is mainnet.
 */
