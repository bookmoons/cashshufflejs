/**
 * Message inbox.
 * @module cashshuffle/inbox
 */

/**
 * Message inbox.
 *
 * Receives messages. Delivers received messages.
 * Delivery order implementation dependent.
 *
 * @interface Inbox
 */

/**
 * Add message to inbox.
 *
 * @method add
 * @memberof module:cashshuffle/inbox~Inbox
 * @instance
 *
 * @param {*} message - Message to add.
 */

/**
 * Receive message from inbox.
 *
 * @method receive
 * @memberof module:cashshuffle/inbox~Inbox
 * @instance
 *
 * @return {*} The next message.
 *
 * @throws {EmptyError} If the inbox is empty.
 */
