/**
 * Convert `Uint8Array` to `Buffer`.
 * @module cashshuffle/util/tonodebuffer/bytes
 */

/**
 * Convert `Uint8Array` to `Buffer`.
 *
 * @param {Uint8Array} bytes - Bytes to convert.
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
