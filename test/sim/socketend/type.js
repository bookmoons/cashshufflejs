/** Socket end simulator types. */

/**
 * Receives data for delivery through the readable side of the socket end.
 *
 * Provided to the read handler.
 *
 * @callback ReadDataReceiver
 * @memberof module:cashshuffle/sim/socketend.SocketEndSimulator
 *
 * @param {?Buffer} chunk - Data chunk to deliver.
 *     `null` signals end of stream. Not modified.
 *
 * @return {boolean} Whether read is done.
 *     If done cease delivering. Otherwise continue.
 */

/**
 * Fulfills read of the socket end.
 *
 * Call `deliver` procedure with chunks until it returns `false`.
 * Call `deliver` with `null` to signal end of stream.
 *
 * @callback ReadHandler
 * @memberof module:cashshuffle/sim/socketend.SocketEndSimulator
 * @async
 *
 * @param {number} size - Number of bytes to read. Advisory.
 * @param {ReadDataReceiver} deliver - Data delivery procedure. Not modified.
 */

/**
 * Send write done signal.
 *
 * Provided to write request fulfiller.
 *
 * @callback WriteDoneSender
 * @memberof module:cashshuffle/sim/socketend.SocketEndSimulator
 *
 * @param {Error} [error=] Error encountered during write fulfillment.
 *     None indicates successful fulfillment.
 */

/**
 * Receives data written to the socket end.
 *
 * @callback WriteHandler
 * @memberof module:cashshuffle/sim/socketend.SocketEndSimulator
 * @async
 *
 * @param {Buffer} chunk - Data chunk written. Not modified.
 */
