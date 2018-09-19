/**
 * Handle data from underlying source.
 *
 * @param chunk - Data to handle. Not modified.
 */
function handleReadData (chunk) {
  this.push(chunk)
}

export default handleReadData
