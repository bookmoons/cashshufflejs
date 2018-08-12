/**
 * Protocol data types. Defined with [protobuf][1].
 *
 * [1]: https://developers.google.com/protocol-buffers/
 *
 * @module cashshuffle/protocol
 */

/**
 * Phase enumeration.
 *
 * @typedef Phase
 * @memberof module:cashshuffle/protocol
 * @enum
 *
 * @prop NONE - Before protocol start.
 * @prop ANNOUNCEMENT - Phase 1. Participants announce themselves.
 * @prop SHUFFLE - Phase 2. Blind shuffling of output addresses.
 * @prop BROADCAST - Phase 3. Verify output addresses.
 * @prop EQUIVOCATION_CHECK - Phase 4. Verify no equivocation.
 * @prop SIGNING - Phase 5a. Sign transaction.
 * @prop VERIFICATION_AND_SUBMISSION - Phase 5b. Submit transaction to network.
 * @prop BLAME - Out of band phase 6. Identify protocol violator.
 */

/**
 * Blame reason enumeration.
 *
 * @typedef Reason
 * @memberof module:cashshuffle/protocol
 * @enum
 *
 * @prop INSUFFICIENTFUNDS - Insufficient funds.
 * @prop DOUBLESPEND - Double spend.
 * @prop EQUIVOCATIONFAILURE - Equivocation failure.
 * @prop SHUFFLEFAILURE - Shuffle failure.
 * @prop SHUFFLEANDEQUIVOCATIONFAILURE - Shuffle and equivocation failure.
 * @prop INVALIDSIGNATURE - Invalid signature.
 * @prop MISSINGOUTPUT - Missing output.
 * @prop LIAR - Liar.
 * @prop INVALIDFORMAT - Invalid format.
 */

/**
 * Invalid message.
 *
 * Provides access to an invalid message as a byte string.
 *
 * @typedef Invalid
 * @memberof module:cashshuffle/protocol
 *
 * @prop {bytes} invalid - Bytes of message.
 */
