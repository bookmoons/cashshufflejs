/** Find package types. */

/**
 * Finder procedure.
 *
 * Every function in the `find` package implements this interface.
 *
 * @callback Finder
 * @memberof module:cashshuffle/aid/find
 *
 * @param value - Element value.
 * @param {number} index - Element index.
 * @param collection - Collection being searched.
 *
 * @return {boolean} Whether the element fulfills the search.
 *     `true` if fulfills. `false` otherwise.
 */
