/**
 * Check equality of 2 `Uint8Array`s.
 *
 * @memberof module:cashshuffle/aid/bytes
 *
 * @param {Uint8Array} first - First `Uint8Array` to compare.
 * @param {Uint8Array} second - Second `Uint8Array` to compare.
 *
 * @return {boolean} Whether `first` is equal to `second`.
 *     `true` if equal. `false` otherwise.
 */
function bytesEqual (first, second) {
  if (first.length !== second.length) return false
  for (let i = first.length - 1; i >= 0; i--) {
    if (first[i] !== second[i]) return false
  }
  return true
}

export default bytesEqual
