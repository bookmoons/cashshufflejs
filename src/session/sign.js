/**
 * Sign a protocol message.
 *
 * @memberof module:cashshuffle/session~Session
 *
 * @param {Signing} signingKeyPair - Key pair to sign with.
 *     Assumed ready for use.
 * @param {protobufjs.Message} message - Protocol message.
 *     Any message type from protocol definition.
 * @param {protobufjs.Type} type - Protocol message type. Used to encode.
 *
 * @return {string} Detached message signature as Base64 encoded string.
 */
async function sign (signingKeyPair, message, type) {
  const messageEncoded = type.encode(message).finish()
  // Normalize to Buffer
  const messageEncodedBuffer = Buffer.from(messageEncoded)
  const messageEncodedString = messageEncodedBuffer.toString('hex')
  const signature = await signingKeyPair.sign(messageEncodedString)
  return signature
}

export default sign
