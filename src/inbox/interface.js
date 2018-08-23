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
 * Removes received message.
 *
 * @method receive
 * @memberof module:cashshuffle/inbox~Inbox
 * @instance
 *
 * @return {*} The next message.
 *
 * @throws {EmptyError} If the inbox is empty.
 */

/**
 * Watch for message in inbox.
 *
 * If nonempty returns next message immediately.
 * If empty waits for next add and returns added message.
 * Optionally watch for limited time.
 * Removes returned message.
 *
 * @method watch
 * @memberof module:cashshuffle/inbox~Inbox
 * @instance
 * @async
 *
 * @param {number?} [timeout=null] - Maximum time to wait in milliseconds.
 *     `null` to wait forever.
 *
 * @return {*} The next message.
 *
 * @throws {BusyError} If another watch operation is running.
 * @throws {TimeoutError} If timeout expires before message arrives.
 */
