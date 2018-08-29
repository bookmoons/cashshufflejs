/**
 * Message drawer.
 * @module cashshuffle/drawer
 */

/**
 * Message drawer.
 *
 * Repeatedly draws protocol messages from an `Inchan`
 * and relays them to a `Receiver`.
 * Draws until stopped.
 *
 * @interface Drawer
 */

/**
 * Start drawing.
 *
 * No effect if already drawing.
 *
 * @method start
 * @memberof module:cashshuffle/drawer~Drawer
 * @instance
 */

/**
 * Stop drawing.
 *
 * Any messages partway through a draw are discarded.
 * No effect if already stopped.
 *
 * @method stop
 * @memberof module:cashshuffle/drawer~Drawer
 * @instance
 */

/**
 * Watch for next message.
 *
 * Provides a promise for the value of the next drawn message.
 * Promise is rejected if drawing is stopped.
 *
 * @var {Promise} watch - Promise for next message.
 * @memberof module:cashshuffle/drawer~Drawer
 * @instance
 */
