/**
 * Safe undefined value.
 * Unaffected by modification of `global.undefined`.
 *
 * This is needed for safe access to the undefined value,
 * since `global.undefined` can be redefined.
 *
 * @constant {undefined}
 * @memberof module:cashshuffle/util
 * @default undefined
 */
const undef = void 0

export default undef
