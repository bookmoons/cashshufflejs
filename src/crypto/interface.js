/**
 * Message encryption.
 * @module cashshuffle/crypto
 */

/**
 * Message encryption functions.
 *
 * Supports key generation, encryption, decryption, and hashing.
 *
 * Performs [ECIES][1] encryption with the [bitcore-ecies][2] 1.0.3
 * default configuration.
 *
 * [1]: http://hdl.handle.net/10261/32671
 * [2]: https://www.npmjs.com/package/bitcore-ecies
 *
 * @interface Crypto
 */

/**
 * Decrypt ciphertext for active key pair.
 *
 * Generate or restore key pair prior to use.
 *
 * @method decryptBytes
 * @memberof module:cashshuffle/crypto~Crypto
 * @instance
 * @async
 *
 * @param {Uint8Array} ciphertext - Ciphertext to decrypt.
 *
 * @return {Uint8Array} Decrypted plaintext.
 *
 * @throws {MissingValueError} If key pair has not been generated or restored.
 */

/**
 * Decrypt and decode to string ciphertext for active key pair.
 *
 * Generate or restore key pair prior to use.
 *
 * @method decryptString
 * @memberof module:cashshuffle/crypto~Crypto
 * @instance
 * @async
 *
 * @param {Base64} ciphertext - Ciphertext to decrypt.
 *
 * @return {string} Decrypted plaintext decoded to string.
 *
 * @throws {MissingValueError} If key pair has not been generated or restored.
 */

/**
 * Encrypt bytes for public key.
 *
 * @method encryptBytes
 * @memberof module:cashshuffle/crypto~Crypto
 * @instance
 * @async
 *
 * @param {Uint8Array} plaintext - Plaintext bytes to encrypt. Not modified.
 * @param {Uint8Array} recipient - Public key of recipient.
 * @param [network=<mainnet>] - Bitcoin Cash network.
 *     Type implementation defined. Not modified.
 *
 * @return {Uint8Array} Ciphertext of `plaintext` for `recipient`.
 */

/**
 * Encode to bytes and encrypt string for public key.
 *
 * @method encryptString
 * @memberof module:cashshuffle/crypto~Crypto
 * @instance
 * @async
 *
 * @param {string} plaintext - Plaintext string to encrypt.
 * @param {HexString} recipient - Public key of recipient.
 * @param [network=<mainnet>] - Bitcoin Cash network.
 *     Type implementation defined. Not modified.
 *
 * @return {Base64} Ciphertext of `plaintext` for `recipient`.
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
 * @return {HexString} Private key.
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
 * @return {HexString} Public key.
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
 * @param [network=<mainnet>] - Network to generate for.
 *     Type implementation defined. Not modified.
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
 * @param {HexString} privateKeyString - Private key.
 * @param [network=<mainnet>] - Network to restore for.
 *     Type implementation defined. Not modified.
 */
