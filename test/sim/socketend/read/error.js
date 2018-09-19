/**
 * Handle error from underlying source.
 *
 * @param error - Error to handle. Not modified.
 */
function handleReadError (error) {
  this.emit('error', error)
}

export default handleReadError
