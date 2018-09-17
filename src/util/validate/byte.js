import { ValueError } from '../../error'

/**
 * Validate `Byte`.
 *
 * Throws error if validation fails.
 * Returns without error if validation succeeds.
 *
 * @memberof module:cashshuffle/util
 *
 * @param {number} number - Number to validate.
 *
 * @throws {ValueError} If `number` is not a valid `Byte`.
 *     Message starts `'invalid byte'`.
 */
function validateByte (number) {
  const type = typeof number
  if (type !== 'number') {
    throw new ValueError(
      {
        cause: new TypeError('not number'),
        info: { type }
      },
      'invalid byte'
    )
  }
  if (Number.isNaN(number)) {
    throw new ValueError(
      {
        cause: new TypeError('not number'),
        info: { NaN: true }
      },
      'invalid byte'
    )
  }
  if (!Number.isInteger(number)) {
    throw new ValueError(
      {
        cause: new TypeError('not integer'),
        info: { number }
      },
      'invalid byte'
    )
  }
  if (!(
    number >= 0 &&
    number <= 255
  )) {
    throw new ValueError(
      {
        cause: new RangeError('not in 0-255'),
        info: { number }
      },
      'invalid byte'
    )
  }
}

export default validateByte
