/**
 * Protocol details. Message types with [protobuf][1].
 *
 * Messages on the wire are terminated with the Unicode character U+23CE
 * Return Symbol in UTF-8. The byte encoding is e2 8f 8e.
 *
 * [1]: https://developers.google.com/protocol-buffers/
 *
 * @module cashshuffle/protocol
 */

/**
 * Length in characters of message terminator.
 *
 * @constant {number}
 * @default 1
 */
const terminatorCharLength = 1

/**
 * Length in bytes of message terminator.
 *
 * @constant {number}
 * @default 3
 */
const terminatorByteLength = 3

/**
 * Message terminator as a string.
 *
 * @constant {string}
 * @default '\u23ce'
 */
const terminatorString = '\u23ce'

/**
 * Message terminator in UTF-8 in a Node.js `Buffer`.
 *
 * @constant {Buffer}
 * @default [ 0xe2, 0x8f, 0x8e ]
 */
const terminatorBuffer = Buffer.from([ 0xe2, 0x8f, 0x8e ])

/**
 * Message terminator in UTF-8 in an `ArrayBuffer`.
 *
 * @constant {ArrayBuffer}
 * @default [ 0xe2, 0x8f, 0x8e ]
 */
const terminatorBinary = Uint8Array.from([ 0xe2, 0x8f, 0x8e ]).buffer

export {
  terminatorCharLength,
  terminatorByteLength,
  terminatorString,
  terminatorBuffer,
  terminatorBinary
}
