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
 * Participant address pair.
 *
 * Associates a Bitcoin Cash address to a named participant.
 * 2 element array.
 *
 * @typedef {Array<string>} ParticipantAddress
 * @memberof module:cashshuffle/coin~Coin
 *
 * @prop {string} 1 - Participant session public key as hex string.
 * @prop {string} 2 - Bitcoin Cash address.
 *
 * @example
const sessionPublicKey =
  '020db431245713add097421a29ec3089f01587a3808d1043fee5956fc5e08effcd'
const address = 'bitcoincash:qr975e2q784jnk0pq2rrk9enuywttyhxryfkyuyjq3'
const participantAddress = [ sessionPublicKey, address ]
 */

/**
 * Bitcoin Cash transaction.
 *
 * Used by various methods to construct a multinput multioutput
 * multisignature transaction over several calls.
 *
 * Type and usage details implementation defined.
 *
 * @typedef Transaction
 * @memberof module:cashshuffle/coin~Coin
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
 * Make unsigned transaction.
 *
 * `Map` instances work well for `inputs` and `changes`.
 * `Set` instances work well for `outputs`.
 *
 * @method makeUnsignedTransaction
 * @memberof module:cashshuffle/coin~Coin
 * @instance
 * @async
 *
 * @param {number} amount - Participant transaction amount in satoshis.
 *     The produced transaction will transfer this amount for each participant.
 * @param {number} fee - Participant fee amount in satoshis.
 *     The produced transaction will charge this fee to each participant.
 * @param {Iterable<ParticipantAddress>} inputs - Transaction inputs.
 *     1 for each participant.
 * @param {Iterable<string>} outputs - Transaction outputs. Each item is a
 *     Bitcoin Cash address. 1 for each participant. Participant associated
 *     with each output unspecified.
 * @param {Iterable<ParticipantAddress>} changes - Transaction change outputs.
 *     0-1 for each participant.
 *
 * @return {Transaction} The unsigned transaction.
 */

/**
 * Produce signature of transaction.
 *
 * Signs named input of provided transaction with provided private key.
 *
 * @method signTransaction
 * @memberof module:cashshuffle/coin~Coin
 * @instance
 * @async
 *
 * @param {Transaction} transaction - Transaction to sign.
 * @param {string} privateKeyString - Signer private key as hex string.
 * @param {string} publicKeyString - Input public key as hex string.
 *
 * @return {string} Signature as hex string.
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
