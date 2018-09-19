import bytesEqual from './equal'

/**
 * Check for bytes at an offset in a byte string.
 *
 * Always `false` for an empty `container`.
 * Always `false` for an empty `value`.
 *
 * @memberof module:cashshuffle/aid/bytes
 *
 * @param {Uint8Array} container - Bytes to check in. Not modified.
 * @param {number} index - Index in `container` to check.
 * @param {Uint8Array} value - Bytes to check for. Not modified.
 *
 * @return {boolean} Whether `container` contains `value` at `index`.
 *     `true` if contains. `false` otherwise.
 *
 * @return {boolean} Whether bytes at `index` in `container` are `value`.
 *     `true` if bytes match. `false` otherwise.
 *
 * @return {boolean} Whether a copy of `value` exists at `index` in
 *     `container`. `true` if found. `false` otherwise.
 */
function bytesAt (container, index, value) {
  if (!container.length) return false
  if (!value.length) return false
  if (index >= container.length) return false
  const endIndex = index + value.length - 1
  if (endIndex >= container.length) return false
  const frame = new Uint8Array(container.buffer, index, value.length)
  const equal = bytesEqual(frame, value)
  return equal
}

export default bytesAt
