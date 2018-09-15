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
 *     `null` to signal end of stream.
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
 * @param {ReadDataReceiver} deliver - Data delivery procedure.
 */

/**
 * Receives data written to the socket end.
 *
 * @callback WriteHandler
 * @memberof module:cashshuffle/sim/socketend.SocketEndSimulator
 * @async
 *
 * @param {Buffer} chunk - Data chunk written.
 */
