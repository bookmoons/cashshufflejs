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
 * Input index.
 *
 * Input index expressed as a decimal number in a string.
 * Provides support for full range specified in Bitcoin protocol.
 * Provides comparison by value enabling use as `Map` keys.
 *
 * @typedef {string} InputIndex
 * @memberof module:cashshuffle/coin~Coin
 */

/**
 * Input signature pair.
 *
 * Associates an input index to an input signature.
 * 2 element array.
 *
 * @typedef {Array<HexString>} InputSignature
 * @memberof module:cashshuffle/coin~Coin
 *
 * @prop {InputIndex} 1 - Input index.
 * @prop {Signature} 2 - Input signature.
 *
 * @example
const inputIndex = 4
const signature =
  '3044022020ea35009d17d25b8a926675ddf0045c397d3df55b0ae115ef80db7849' +
  '529b9302201f13bd2cbd1ca0a24e2c5ab28030aa9b7b3dcacf175652dad82fe9d5' +
  '973f340901'
const inputSignature = [ inputIndex, signature ]
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
 * @prop {CashAddress} 2 - Bitcoin Cash address.
 *
 * @example
const sessionPublicKey =
  '020db431245713add097421a29ec3089f01587a3808d1043fee5956fc5e08effcd'
const address = 'bitcoincash:qr975e2q784jnk0pq2rrk9enuywttyhxryfkyuyjq3'
const participantAddress = [ sessionPublicKey, address ]
 */

/**
 * Transaction signature.
 *
 * Signature of a [SIGHASH_ALL][1] type transaction hash.
 * Represented as a hex string.
 *
 * [1]: https://bitcoin.org/en/developer-guide#signature-hash-types
 *
 * @typedef {HexString} Signature
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
 * Add input signature to transaction.
 *
 * @method addTransactionSignature
 * @memberof module:cashshuffle/coin~Coin
 * @instance
 * @async
 *
 * @param {Transaction} transaction - Transaction to add signature to.
 * @param {InputIndex} inputIndex - Index of input to add signature to.
 * @param {Signature} signature - Input signature.
 *
 * @return {Transaction} Transaction with signature added.
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
 * @param [network=<mainnet>] - Bitcoin Cash network.
 *     Type implementation defined.
 *
 * @return {CashAddress} P2PKH address for the public key.
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
 * `Map` instances work well for `inputAddresses` and `changeAddresses`.
 * `Set` instances work well for `outputAddresses`.
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
 * @param {Iterable<ParticipantAddress>} inputAddresses - Input addresses.
 *     1 for each participant.
 * @param {Iterable<CashAddress>} outputAddresses - Output addresses. 1 for
 *     each participant. Participant associated with each output unspecified.
 * @param {Iterable<ParticipantAddress>} changeAddresses - Change output
 *     addresses. 0-1 for each participant.
 *
 * @return {Transaction} The unsigned transaction.
 */

/**
 * Produce signature of transaction input.
 *
 * Signs named input of provided transaction with provided private key.
 *
 * @method signTransactionInput
 * @memberof module:cashshuffle/coin~Coin
 * @instance
 * @async
 *
 * @param {Transaction} transaction - Transaction to sign.
 * @param {InputIndex} inputIndex - Index of input to sign.
 * @param {HexString} privateKeyString - Signer private key.
 *
 * @return {Signature} Signature.
 */

/**
 * Produce signatures of all possible transaction inputs.
 *
 * Signs all inputs of provided transaction controlled by provided private
 * key.
 *
 * @method signTransactionInputs
 * @memberof module:cashshuffle/coin~Coin
 * @instance
 * @async
 *
 * @param {Transaction} transaction - Transaction to sign.
 * @param {HexString} privateKeyString - Signer private key.
 *
 * @return {Map<InputIndex,Signature>} Signatures. Key input index.
 *     Value signature.
 */

/**
 * Verify address has sufficient funds.
 *
 * @method sufficientFunds
 * @memberof module:cashshuffle/coin~Coin
 * @instance
 * @async
 *
 * @param {CashAddress} address - Bitcoin Cash address to check.
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
 * @param [network=<mainnet>] - Bitcoin Cash network.
 *     Type implementation defined.
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
 * @param {InputIndex} inputIndex - Input of index to verify signature of.
 * @param {Signature} signature - Signature to verify.
 *
 * @return {boolean} Whether the signature is valid. True if for the named
 *     input of provided transaction.
 */
