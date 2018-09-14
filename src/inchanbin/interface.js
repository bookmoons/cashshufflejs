/**
 * Binary message input channel.
 * @module cashshuffle/inchanbin
 */

/**
 * Binary message input channel.
 *
 * Delivers raw binary network messages from other shufflers.
 *
 * Means of acquiring returned message implementation defined.
 * Order of returned messages implementation defined.
 *
 * @interface Inchanbin
 */

/**
 * Receive next message.
 *
 * @method receive
 * @memberof module:cashshuffle/inchanbin~Inchanbin
 * @instance
 * @async
 *
 * @return {ArrayBuffer} message - Network message from other shuffler.
 *
 * @throws {BusyError} If another receive is already in progress.
 */
