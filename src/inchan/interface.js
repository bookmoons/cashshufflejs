/**
 * Player message input channel.
 * @module cashshuffle/inchan
 */

/**
 * Player message input channel.
 *
 * Delivers network messages from other players.
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
 * @return {ArrayBuffer} message - Network message from other player.
 */
