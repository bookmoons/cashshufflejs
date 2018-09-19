/**
 * Convert `Uint8Array` to `Buffer`.
 *
 * @memberof module:cashshuffle/aid/convert
 *
 * @param {Uint8Array} bytes - Bytes to convert. Not modified.
 *
 * @return {Buffer} New `Buffer` containing bytes in `bytes`.
 */
function bytesToNodeBuffer (bytes) {
  const length = bytes.byteLength
  const nodeBuffer = Buffer.alloc(length)
  for (let i = 0; i < length; i++) nodeBuffer[i] = bytes[i]
  return nodeBuffer
}

export default bytesToNodeBuffer
