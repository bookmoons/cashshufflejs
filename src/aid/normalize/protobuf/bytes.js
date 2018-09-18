import arrayToBytes from '../../tobytes/array'

/**
 * Normalize `protobufjs` bytes value to `Uint8Array`.
 *
 * The [protobufjs docs][1] don't seem to specify the output type of protobuf
 * `bytes` values on message conversion to an object. Some of the code seems
 * to indicate it varies by environment. Tne conversion from object procedure
 * specifies as expected input for a `bytes` field one of: `Uint8Array`
 * `Buffer` `Array<number>`.
 *
 * The docs for the `Writer` class used to encode a message to a byte string
 * also variously mention `Uint8Array` `Buffer` `Array` as output type.
 *
 * For crossplatform safety, `cashshufflejs` normalizes these 3 possible types
 * to `Uint8Array` at all points of ambiguity.
 *
 * @param {(Uint8Array|Buffer|Array<number>)} denormalBytes - A `bytes` field
 *     value as provided by `protobufjs`.
 *
 * @return {Uint8Array} A new `Uint8Array` containing the bytes in
 *     `denormalBytes`.
 */
function normalizeProtobufBytes (denormalBytes) {
  const bytesArray = [ ...denormalBytes ]
  const bytes = arrayToBytes(bytesArray)
  return bytes
}

export default normalizeProtobufBytes
