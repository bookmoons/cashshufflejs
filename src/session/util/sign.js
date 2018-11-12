import { bytesToBase64, bytesToHex } from '../../aid/convert'
import { normalizeProtobufBytes } from '../../aid/normalize'

/**
 * Sign a protocol message.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {Signing} signingKeyPair - Key pair to sign with.
 *     Assumed ready for use.
 * @param {protobufjs.Message} message - Protocol message.
 *     Any message type from protocol definition. Not modified.
 * @param {protobufjs.Type} type - Protocol message type. Used to encode.
 *     Not modified.
 *
 * @return {Base64} Detached message signature.
 */
async function sign (signingKeyPair, message, type) {
  const messageBytesDenormal = type.encode(message).finish()
  const messageBytes = normalizeProtobufBytes(messageBytesDenormal)
  const messageHex = bytesToHex(messageBytes)
  const signature = await signingKeyPair.sign(messageHex)
  const signatureBase64 = bytesToBase64(signature)
  return signatureBase64
}

export default sign
