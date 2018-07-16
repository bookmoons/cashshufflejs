/**
 * Safe undefined value.
 * @module cashshuffle/util/undef
 */

/**
 * Safe undefined value.
 * Unaffected by modification of `global.undefined`.
 *
 * This is needed for safe access to the undefined value,
 * since `global.undefined` can be redefined.
 *
 * @constant {undefined}
 * @default undefined
 * @alias module:cashshuffle/util/undef
 */
const undef = void 0

export default undef
