/**
 * Handle `data` event of a connection stream.
 *
 * @param {object} connection - Connection package.
 * @param {Buffer} chunk - Data chunk.
 */
function handleData (connection, chunk) {
  connection.queue.add(chunk)
}

export default handleData
