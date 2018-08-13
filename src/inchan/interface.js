/**
 * Message input channel.
 * @module cashshuffle/inchan
 */

/**
 * Message input channel.
 *
 * Delivers network messages from other participants.
 *
 * Means of acquiring returned messages implementation defined.
 * Order of returned messages implementation defined.
 *
 * @interface Inchan
 */

/**
 * Receive next message.
 *
 * @method receive
 * @memberof module:cashshuffle/inchan~Inchan
 * @instance
 * @async
 *
 * @return {protocol.Signed} message - Network message from other participant.
 *
 * @throws {BusyError} If another receive is already in progress.
 */
