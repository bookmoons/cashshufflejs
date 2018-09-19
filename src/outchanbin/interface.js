/**
 * Binary message output channel.
 * @module cashshuffle/outchanbin
 */

/**
 * Binary message output channel.
 *
 * Delivers raw binary network messages to other shufflers.
 * Terminates each message with protocol delimiter.
 *
 * Means of delivering messages implementation defined.
 * Delivery order implementation defined.
 *
 * @interface Outchanbin
 */

/**
 * Send message.
 *
 * @method send
 * @memberof module:cashshuffle/outchanbin~Outchanbin
 * @instance
 * @async
 *
 * @param {ArrayBuffer} message - Message to send. Not modified.
 *
 * @throws {BusyError} If another send is already in progress.
 */
