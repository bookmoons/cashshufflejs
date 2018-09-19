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
 * @return {number} `lengthSum` with `length` of `bytes` added.
 */
function bytesToLengthSum (lengthSum, bytes) {
  const length = bytes.length
  lengthSum += length
  return lengthSum
}

export default bytesToLengthSum
