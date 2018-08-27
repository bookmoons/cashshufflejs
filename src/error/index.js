/**
 * Custom error types.
 * @module cashshuffle/error
 * @see The [verror docs](https://www.npmjs.com/package/verror#constructors)
 *     for constructor parameters.
 */

export { default as CashShuffleError } from './CashShuffle'
export { default as BusyError } from './Busy'
export { default as EmptyError } from './Empty'
export { default as ExhaustionError } from './Exhaustion'
export { default as FormatError } from './Format'
export { default as InadequateError } from './Inadequate'
export { default as MissingFeatureError } from './MissingFeature'
export { default as MissingValueError } from './MissingValue'
export { default as NotImplementedError } from './NotImplemented'
export { default as TimeoutError } from './Timeout'
export { default as ValueError } from './Value'
