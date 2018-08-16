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
 * @param {*} [network=<mainnet>] - Network to generate for.
 *     Type implementation defined.
 */
