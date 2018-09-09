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
 * Input signature pair.
 *
 * Associates an input public key to an input signature.
 * 2 element array.
 *
 * @typedef {Array<HexString>} InputSignature
 * @memberof module:cashshuffle/coin~Coin
 *
 * @prop {HexString} 1 - Input public key.
 * @prop {Signature} 2 - Input signature.
 *
 * @example
const inputPublicKey =
  '034115e5452127bb9409f727539fa054281dd2bb6909725886aa5d90628d42fd1e'
const signature =
  '3044022020ea35009d17d25b8a926675ddf0045c397d3df55b0ae115ef80db7849' +
  '529b9302201f13bd2cbd1ca0a24e2c5ab28030aa9b7b3dcacf175652dad82fe9d5' +
  '973f340901'
const inputSignature = [ inputPublicKey, signature ]
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
 * @prop {HexString} 1 - Participant session public key.
 * @prop {CashAddr} 2 - Bitcoin Cash address.
 *
 * @example
const sessionPublicKey =
  '020db431245713add097421a29ec3089f01587a3808d1043fee5956fc5e08effcd'
const address = 'bitcoincash:qr975e2q784jnk0pq2rrk9enuywttyhxryfkyuyjq3'
const participantAddress = [ sessionPublicKey, address ]
 */

/**
 * Bitcoin Cash transaction input signature.
 *
 * Type and usage details implementation defined.
 *
 * @typedef Signature
 * @memberof module:cashshuffle/coin~Coin
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
 * Add input signatures to transaction.
 *
 * `Map` instances work well for `signatures`.
 *
 * @method addTransactionSignatures
 * @memberof module:cashshuffle/coin~Coin
 * @instance
 * @async
 *
 * @param {Transaction} transaction - Transaction to add signatures to.
 * @param {Iterable<InputSignature>} signatures - Signatures to add.
 *
 * @return {Transaction} Transaction with signatures added.
 */

/**
 * Get P2PKH address for public key.
 *
 * @method address
 * @memberof module:cashshuffle/coin~Coin
 * @instance
 * @async
 *
 * @param {HexString} publicKeyString - Public key.
 *
 * @return {CashAddr} P2PKH address for the public key.
 */

/**
 * Broadcast transaction.
 *
 * Submits transaction to Bitcoin Cash network.
 *
 * @method broadcastTransaction
 * @memberof module:cashshuffle/coin~Coin
 * @instance
 * @async
 *
 * @param {Transaction} transaction - Transaction to broadcast.
 *
 * @throws {BusyError} If any other network operation is running.
 * @throws If transaction submission fails.
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
 * @param {Iterable<CashAddr>} outputs - Transaction outputs. 1 for each
 *     participant. Participant associated with each output unspecified.
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
 * @param {HexString} privateKeyString - Signer private key.
 * @param {HexString} publicKeyString - Input public key.
 *
 * @return {Signature} Signature.
 */

/**
 * Verify address has sufficient funds.
 *
 * @method sufficientFunds
 * @memberof module:cashshuffle/coin~Coin
 * @instance
 * @async
 *
 * @param {CashAddr} address - Bitcoin Cash address to check.
 * @param {number} amount - Required amount in satoshis.
 *
 * @return {boolean} Whether address has sufficient funds. True if address
 *     has the given amount or more.
 *
 * @throws {BusyError} If any other network operation is running.
 */

/**
 * Verify message signature.
 *
 * @method verifySignature
 * @memberof module:cashshuffle/coin~Coin
 * @instance
 * @async
 *
 * @param {Base64} signature - Message signature.
 * @param {string} message - Plaintext message.
 * @param {HexString} publicKeyString - Signer public key.
 *
 * @return {boolean} Whether the signature is valid. True if from the named
 *     signer and for the given message.
 */

/**
 * Verify transaction input signature.
 *
 * @method verifyTransactionSignature
 * @memberof module:cashshuffle/coin~Coin
 * @instance
 * @async
 *
 * @param {Transaction} transaction - Transaction to verify signature for.
 * @param {Signature} signature - Signature to verify.
 * @param {HexString} publicKeyString - Input public key.
 *
 * @return {boolean} Whether the signature is valid. True if for the named
 *     input of provided transaction.
 */
