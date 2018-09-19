/**
 * Message output channel.
 * @module cashshuffle/outchan
 */

/**
 * Message output channel.
 *
 * Delivers network messages to other shufflers.
 *
 * Means of delivering messages implementation defined.
 * Delivery order implementation defined.
 *
 * @interface Outchan
 */

/**
 * Send message.
 *
 * @method send
 * @memberof module:cashshuffle/outchan~Outchan
 * @instance
 * @async
 *
 * @param {protocol.Packets} message - Message to send. Not modified.
 *
 * @throws {BusyError} If another send is already in progress.
 */
