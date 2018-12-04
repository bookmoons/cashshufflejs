import { FormatError } from '/error'

/**
 * Decode message after wire transfer.
 *
 * Deserializes from [protobuf wire format][1].
 *
 * [1]: https://developers.google.com/protocol-buffers/docs/encoding
 *
 * @memberof module:cashshuffle/aid/code
 *
 * @param {protocol.Root} protocol - Protocol definition. Not modified.
 * @param {Uint8Array} signedEncoded - Encoded message. Not modified.
 *
 * @return {protocol.Signed} Message encoded by `signedEncoded`.
 *
 * @throws {FormatError} If wire message fails to parse.
 *     Message `'invalid wire message'`.
 */
function transferDecodeSigned (protocol, signedEncoded) {
  let signed
  try {
    signed = protocol.Signed.decode(signedEncoded)
  } catch (e) {
    throw new FormatError(
      { cause: e, info: { signedEncoded } },
      'invalid wire message'
    )
  }
  return signed
}

export default transferDecodeSigned
