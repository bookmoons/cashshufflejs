/**
 * Binary message input channel.
 * @module cashshuffle/inchanbin
 */

/**
 * Binary message input channel.
 *
 * Delivers raw binary network messages from other participants.
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
 * @return {ArrayBuffer} message - Network message from other participant.
 */
