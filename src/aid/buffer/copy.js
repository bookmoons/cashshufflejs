/**
 * Copy `ArrayBuffer`.
 *
 * @memberof module:cashshuffle/aid/buffer
 *
 * @param {ArrayBuffer} buffer - `ArrayBuffer` to copy. Not modified.
 *
 * @return {ArrayBuffer} New `ArrayBuffer` containing copy of bytes
 *     in `buffer`.
 */
function copyBuffer (buffer) {
  const bufferCopy = buffer.slice(0)
  return bufferCopy
}

export default copyBuffer
