/**
 * Message signing.
 * @module cashshuffle/signing
 */

/**
 * Message signing functions.
 *
 * Supports key generation, signing, and verifying.
 *
 * Performs [ECDSA][1] digital signature operations.
 *
 * [1]: https://cryptopp.com/wiki/Elliptic_Curve_Digital_Signature_Algorithm
 *
 * @interface Signing
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
 * @memberof module:cashshuffle/signing~Signing
 * @instance
 * @async
 *
 * @return {string} Public key as hex string.
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
 *     Type implementation defined.
 */

/**
 * Restore key pair from private key hex string.
 *
 * @method restoreKeyPair
 * @memberof module:cashshuffle/signing~Signing
 * @instance
 * @async
 *
 * @param {string} privateKeyString - Private key as hex string.
 * @param [network=<mainnet>] - Network to restore for.
 *     Type implementation defined.
 */
