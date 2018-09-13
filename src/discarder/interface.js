/**
 * Message discarder.
 * @module cashshuffle/discarder
 */

/**
 * Message discarder.
 *
 * Specialized message receiver.
 * Accepts error/message pairs.
 *
 * @interface Discarder
 * @extends Receiver
 */

/**
 * @typedef {Array} ErrorMessagePair
 * @memberof module:cashshuffle/discarder~Discarder
 *
 * @prop {Error} 0 - Error. Explains cause of discard.
 * @prop {*} 1 - Message.
 */

/**
 * Submit error message pair.
 *
 * @method submit
 * @memberof module:cashshuffle/discarder~Discarder
 * @instance
 * @async
 *
 * @param {ErrorMessagePair} errorMessagePair - Error and message to submit.
 */
