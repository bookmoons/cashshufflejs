/**
 * Reduce `Uint8Array` to `length` sum.
 *
 * Use initial value `0`.
 *
 * @memberof module:cashshuffle/aid/reduce
 *
 * @implements {Reducer}
 *
 * @param {number} lengthSum - Summed `length`.
 * @param {Uint8Array} bytes - `Uint8Array` to reduce.
 *
 * @return {number} Sum of `lengthSum` and `length` of `bytes`.
 */
function bytesToLengthSum (lengthSum, bytes) {
  const length = bytes.length
  lengthSum += length
  return lengthSum
}

export default bytesToLengthSum
