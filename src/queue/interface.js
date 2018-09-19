/**
 * Processing queue.
 * @module cashshuffle/queue
 */

/**
 * Processing queue.
 *
 * Receives pieces of data.
 * Runs processing on each piece of data in order received.
 *
 * Data is received synchronously.
 * Processing is potentially performed asynchronously.
 * Data is buffered if received during processing.
 *
 * @interface Queue
 */

/**
 * Add data to queue.
 *
 * @method add
 * @memberof module:cashshuffle/queue~Queue
 * @instance
 *
 * @param data - Data to add. Not modified.
 */

/**
 * Promise for queue empty.
 *
 * No resolution value.
 *
 * @var {Promise} empty
 * @memberof module:cashshuffle/queue~Queue
 * @instance
 */
