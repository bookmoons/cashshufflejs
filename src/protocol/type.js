/* Protocol types. */

/**
 * Phase enumeration.
 *
 * @typedef Phase
 * @memberof module:cashshuffle/protocol
 * @enum
 *
 * @prop None - Before protocol start.
 * @prop Announcement - Phase 1. Participants announce themselves.
 * @prop Shuffle - Phase 2. Blind shuffling of output addresses.
 * @prop Broadcast - Phase 3. Verify output addresses.
 * @prop EquivocationCheck - Phase 4. Verify no equivocation.
 * @prop Signing - Phase 5a. Sign transaction.
 * @prop VerificationSubmission - Phase 5b. Submit transaction to network.
 * @prop Blame - Out of band phase 6. Identify protocol violator.
 */

/**
 * Blame reason enumeration.
 *
 * @typedef Reason
 * @memberof module:cashshuffle/protocol
 * @enum
 *
 * @prop InsufficientFunds - Insufficient funds.
 * @prop DoubleSpend - Double spend.
 * @prop EquivocationFailure - Equivocation failure.
 * @prop ShuffleFailure - Shuffle failure.
 * @prop ShuffleEquivocationFailure - Shuffle and equivocation failure.
 * @prop InvalidSignature - Invalid signature.
 * @prop MissingOutput - Missing output.
 * @prop Liar - Liar.
 * @prop InvalidFormat - Invalid format.
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

/**
 * Bitcoin Cash address.
 *
 * @typedef Address
 * @memberof module:cashshuffle/protocol
 *
 * @prop {string} address - Bitcoin Cash address as string.
 */

/**
 * Description key.
 *
 * @typedef DecryptionKey
 * @memberof module:cashshuffle/protocol
 *
 * @prop {string} key - Decryption key as string.
 * @prop {string} public
 */

/**
 * Encryption key.
 *
 * @typedef EncryptionKey
 * @memberof module:cashshuffle/protocol
 *
 * @prop {string} key - Encryption key as string.
 */

/**
 * Message hash.
 *
 * Enables validating message integrity.
 *
 * @typedef Hash
 * @memberof module:cashshuffle/protocol
 *
 * @prop {bytes} hash - Hash as byte string.
 */

/**
 * Registration request.
 *
 * @typedef Registration
 * @memberof module:cashshuffle/protocol
 *
 * @prop {uint64} amount - Amount of Bitcoin Cash to shuffle.
 */

/**
 * Digital signature.
 *
 * Enables verifying message authenticity.
 *
 * @typedef Signature
 * @memberof module:cashshuffle/protocol
 *
 * @prop {bytes} signature - Signature as byte string.
 */

/**
 * Bitcoin Cash transaction.
 *
 * @typedef Transaction
 * @memberof module:cashshuffle/protocol
 *
 * @prop {bytes} transaction - Bitcoin Cash transaction as byte string.
 */

/**
 * Verification key.
 *
 * Public key of a participant.
 * Used to identify sender and recipient in messages.
*
* @typedef VerificationKey
* @memberof module:cashshuffle/protocol
*
* @prop {string} key - Verification key as string.
*/

/**
 * Core message.
 *
 * @typedef Message
 * @memberof module:cashshuffle/protocol
 *
 * @prop {protocol.Address} address
 *     Bitcoin Cash address.
 * @prop {protocol.EncryptionKey} key
 *     Encryption key.
 * @prop {protocol.Hash} hash
 *     Message hash.
 * @prop {protocol.Signature} signature
 *     Message signature.
 * @prop {string} str
 * @prop {protocol.Blame} blame - Blame details.
 * @prop {protocol.Message} next
 */

/**
 * Packaged message.
 *
 * Message with envelope and packaging details.
 *
 * @typedef Packet
 * @memberof module:cashshuffle/protocol
 *
 * @prop {bytes} session - Session number.
 * @prop {uint32} number
 * @prop {protocol.VerificationKey} from_key - Sender public key.
 * @prop {protocol.VerificationKey} to_key - Recipient public key.
 * @prop {protocol.Phase} phase - Protocol phase.
 * @prop {protocol.Message} message - Core message.
 * @prop {protocol.Registration} registration - Registration request.
 */

/**
 * Signed packaged message.
 *
 * Packaged message with signature.
 *
 * @typedef Signed
 * @memberof module:cashshuffle/protocol
 *
 * @prop {protocol.Packet} packet - Packaged message.
 * @prop {protocol.Signature} signature - Packet signature.
 */

/**
 * List of signed packets.
 *
 * @typedef Packets
 * @memberof module:cashshuffle/protocol
 *
 * @prop {Array<protocol.Signed>} packet - Signed packets.
 */

/**
 * Blame details.
 *
 * @typedef Blame
 * @memberof module:cashshuffle/protocol
 *
 * @prop {protocol.Reason} reason - Blame reason.
 * @prop {protocol.VerificationKey} accused
 *     Public key of accused participant.
 * @prop {protocol.DecryptionKey} key - Decryption key.
 * @prop {protocol.Invalid} invalid - Invalid message.
 * @prop {protocol.Packets} packets - List of signed packets.
 */
