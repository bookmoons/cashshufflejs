/** Reduce package types. */

/**
 * Reducer procedure.
 *
 * Argument to `Array.prototype.reduce`.
 * Every function in the `reduce` package implements this interface.
 *
 * @callback Reducer
 * @memberof module:cashshuffle/aid/reduce
 *
 * @param accumulator - Accumulated value.
 * @param currentValue - Element value.
 * @param {number} currentIndex - Element index.
 * @param {Array} array - `Array` being reduced.
 *
 * @return New accumulated value.
 */
