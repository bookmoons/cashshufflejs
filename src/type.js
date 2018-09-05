/* Common cashshufflejs types. */

/**
 * Base64 string.
 *
 * Represents binary data as an [RFC 4648][1] conforming Base64 encoded value
 * in a string. [Standard encoding][2] and [URL and filename safe encoding][3]
 * allowed.
 *
 * [1]: https://tools.ietf.org/html/rfc4648
 * [2]: https://tools.ietf.org/html/rfc4648#section-4
 * [3]: https://tools.ietf.org/html/rfc4648#page-7
 *
 * @typedef {string} Base64
 * @memberof module:cashshuffle
 */

/**
 * Hexadecimal string.
 *
 * Represents binary data as a hexadecimal number in a string.
 * Binary data is interpreted as a string of octets.
 *
 * Uses characters:
 *
 * - Decimal digits signifying their usual values: `0 1 2 3 4 5 6 7 8 9`.
 * - Case insensitive A-F to signify numbers 10-15: `a b c d e f`
 *   or `A B C D E F`.
 *
 * Each octet is represented by 2 hexadecimal digits in big endian order.
 * The complete value is represented by a series of octet character pairs
 * in little endian order.
 *
 * @typedef {string} HexString
 * @memberof module:cashshuffle
 *
 * @example
// [ 0x01, 0x02, 0x03, 0xa0, 0xb0, 0xc0 ]
const hexString = '010203a0b0c0'
 */
