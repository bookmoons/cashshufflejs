/**
 * Message signing.
 * @module cashshuffle/signing
 */

/**
 * Message signing functions.
 *
 * Supports key generation and signing.
 *
 * Performs [ECDSA][1] operations with [&#64;bookmoons/bitcore-message-cash][2]
 * 2.0.0 default configuration.
 *
 * [1]: https://cryptopp.com/wiki/Elliptic_Curve_Digital_Signature_Algorithm
 * [2]: https://www.npmjs.com/package/@bookmoons/bitcore-message-cash
 *
 * @interface Signing
 */

/**
 * Get Bitcoin Cash address of key pair.
 *
 * Generate or restore key pair prior to use.
 *
 * @method address
 * @memberof module:cashshuffle/signing~Signing
 * @instance
 * @async
 *
 * @return {CashAddress} Bitcoin Cash address.
 *
 * @throws {MissingValueError} If key pair has not been generated or restored.
 */

/**
 * Export private key as hex string.
 *
 * Generate or restore key pair prior to use.
 *
 * @method exportPrivateKey
 * @memberof module:cashshuffle/signing~Signing
 * @instance
 * @async
 *
 * @return {Uint8Array} Private key.
 *
 * @throws {MissingValueError} If key pair has not been generated or restored.
 */

/**
 * Export public key as hex string.
 *
 * Generate or restore key pair prior to use.
 *
 * @method exportPublicKey
 * @memberof module:cashshuffle/signing~Signing
 * @instance
 * @async
 *
 * @return {Uint8Array} Public key.
 *
 * @throws {MissingValueError} If key pair has not been generated or restored.
 */

/**
 * Generate ECDSA key pair for message signing.
 *
 * Generated key pair is saved internally and used for subsequent operations.
 * No return value. Subsequent calls discard and replace old key pair.
 *
 * @method generateKeyPair
 * @memberof module:cashshuffle/signing~Signing
 * @instance
 * @async
 *
 * @param [network=<mainnet>] - Network to generate for.
 *     Type implementation defined. Not modified.
 */

/**
 * Restore key pair from private key hex string.
 *
 * @method restoreKeyPair
 * @memberof module:cashshuffle/signing~Signing
 * @instance
 * @async
 *
 * @param {Uint8Array} privateKey - Private key. Not modified.
 * @param [network=<mainnet>] - Network to restore for.
 *     Type implementation defined. Not modified.
 */

/**
 * Sign message with active key pair.
 *
 * Generate or restore key pair prior to use.
 *
 * @method sign
 * @memberof module:cashshuffle/signing~Signing
 * @instance
 * @async
 *
 * @param {string} message - Message to sign.
 *
 * @return {Uint8Array} Detached message signature.
 *
 * @throws {MissingValueError} If key pair has not been generated or restored.
 */
