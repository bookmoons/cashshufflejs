/* Protocol types. */

/**
 * Phase enumeration.
 *
 * @typedef Phase
 * @memberof module:cashshuffle/protocol
 * @enum
 *
 * @prop {number} None - Before protocol start. Value 0.
 * @prop {number} Announcement - Phase 1. Shufflers announce themselves.
 *     Value 1.
 * @prop {number} Shuffle - Phase 2. Blind shuffling of output addresses.
 *     Value 2.
 * @prop {number} Broadcast - Phase 3. Verify output addresses. Value 3.
 * @prop {number} EquivocationCheck - Phase 4. Verify no equivocation.
 *     Value 4.
 * @prop {number} Signing - Phase 5a. Sign transaction. Value 5.
 * @prop {number} VerificationSubmission - Phase 5b. Submit transaction to
 *     Bitcoin Cash network. Value 6.
 * @prop {number} Blame - Out of band phase 6. Identify protocol violator.
 *     Value 7.
 */

/**
 * Blame reason enumeration.
 *
 * @typedef Reason
 * @memberof module:cashshuffle/protocol
 * @enum
 *
 * @prop {number} InsufficientFunds - Insufficient funds. Value 0.
 * @prop {number} DoubleSpend - Double spend. Value 1.
 * @prop {number} EquivocationFailure - Equivocation failure. Value 2.
 * @prop {number} ShuffleFailure - Shuffle failure. Value 3.
 * @prop {number} ShuffleEquivocationFailure - Shuffle and equivocation
 *     failure. Value 4.
 * @prop {number} InvalidSignature - Invalid signature. Value 5.
 * @prop {number} MissingOutput - Missing output. Value 6.
 * @prop {number} Liar - Liar. Value 7.
 * @prop {number} InvalidFormat - Invalid format. Value 8.
 */

/**
 * Invalid message.
 *
 * Provides access to an invalid message as a byte string.
 *
 * @typedef Invalid
 * @memberof module:cashshuffle/protocol
 *
 * @prop {bytes} [invalid=] - Bytes of message.
 */

/**
 * Bitcoin Cash address.
 *
 * @typedef Address
 * @memberof module:cashshuffle/protocol
 *
 * @prop {Address} [address=] - Bitcoin Cash address.
 */

/**
 * Description key.
 *
 * @typedef DecryptionKey
 * @memberof module:cashshuffle/protocol
 *
 * @prop {string} [key=] - Decryption key as string.
 * @prop {string} [public=]
 */

/**
 * Encryption key.
 *
 * @typedef EncryptionKey
 * @memberof module:cashshuffle/protocol
 *
 * @prop {string} [key=] - Encryption key as string.
 */

/**
 * Message hash.
 *
 * Enables validating message integrity.
 *
 * @typedef Hash
 * @memberof module:cashshuffle/protocol
 *
 * @prop {bytes} [hash=] - Hash as byte string.
 */

/**
 * Input signature.
 *
 * @typedef InputSignature
 * @memberof module:cashshuffle/protocol
 *
 * @prop {uint64} index - Input index.
 * @prop {protocol.Signature} signature - Input signature.
 */

/**
 * Registration request.
 *
 * @typedef Registration
 * @memberof module:cashshuffle/protocol
 *
 * @prop {uint64} [amount=] - Amount of Bitcoin Cash to shuffle.
 */

/**
 * Digital signature.
 *
 * Enables verifying message authenticity.
 *
 * @typedef Signature
 * @memberof module:cashshuffle/protocol
 *
 * @prop {bytes} [signature=] - Signature as byte string.
 */

/**
 * Bitcoin Cash transaction.
 *
 * @typedef Transaction
 * @memberof module:cashshuffle/protocol
 *
 * @prop {bytes} [transaction=] - Bitcoin Cash transaction as byte string.
 */

/**
 * Verification key.
 *
 * Public key of a shuffler.
 * Used to identify sender and recipient in messages.
*
* @typedef VerificationKey
* @memberof module:cashshuffle/protocol
*
* @prop {string} [key=] - Verification key as string.
*/

/**
 * Core message.
 *
 * @typedef Message
 * @memberof module:cashshuffle/protocol
 *
 * @prop {protocol.Address} [address=]
 *     Bitcoin Cash address.
 * @prop {protocol.EncryptionKey} [key=]
 *     Encryption key.
 * @prop {protocol.Hash} [hash=]
 *     Message hash.
 * @prop {protocol.Signature} [signature=]
 *     Message signature.
 * @prop {string} [str=]
 * @prop {protocol.Blame} [blame=] - Blame details.
 * @prop {protocol.Message} [next=]
 * @prop {Array<protocol.InputSignature>} [signatures=] - Input signatures.
 */

/**
 * Packaged message.
 *
 * Message with envelope and packaging details.
 *
 * @typedef Packet
 * @memberof module:cashshuffle/protocol
 *
 * @prop {bytes} [session=] - Session number.
 * @prop {uint32} [number=]
 * @prop {protocol.VerificationKey} [from_key=] - Sender public key.
 * @prop {protocol.VerificationKey} [to_key=] - Recipient public key.
 * @prop {protocol.Phase} [phase=] - Protocol phase.
 * @prop {protocol.Message} [message=] - Core message.
 * @prop {protocol.Registration} [registration=] - Registration request.
 */

/**
 * Signed packaged message.
 *
 * Packaged message with signature.
 *
 * @typedef Signed
 * @memberof module:cashshuffle/protocol
 *
 * @prop {protocol.Packet} [packet=] - Packaged message.
 * @prop {protocol.Signature} [signature=] - Packet signature.
 */

/**
 * List of signed packets.
 *
 * @typedef Packets
 * @memberof module:cashshuffle/protocol
 *
 * @prop {Array<protocol.Signed>} [packet=] - Signed packets.
 */

/**
 * Blame details.
 *
 * @typedef Blame
 * @memberof module:cashshuffle/protocol
 *
 * @prop {protocol.Reason} [reason=] - Blame reason.
 * @prop {protocol.VerificationKey} [accused=]
 *     Public key of accused shuffler.
 * @prop {protocol.DecryptionKey} [key=] - Decryption key.
 * @prop {protocol.Transaction} [transaction=]
 * @prop {protocol.Invalid} [invalid=] - Invalid message.
 * @prop {protocol.Packets} [packets=] - List of signed packets.
 */
