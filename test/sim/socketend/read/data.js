/**
 * Handle data from underlying source.
 *
 * @param chunk - Data to handle.
 */
function handleReadData (chunk) {
  this.push(chunk)
}

export default handleReadData
