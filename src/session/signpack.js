import privs from './privs'

/**
 * Sign a `protocol.Packet` instance.
 *
 * @memberof module:cashshuffle/session~Session
 *
 * @param {Signing} signingKeyPair - Key pair to sign with.
 *     Assumed ready for use.
 * @param {protocol.Packet} message - Packet instance.
 *
 * @return {string} Detached message signature as Base64 encoded string.
 */
async function signPacket (signingKeyPair, message) {
  const priv = privs.get(this)
  const Packet = priv.protocol.Packet
  const signature = await this.sign(signingKeyPair, message, Packet)
  return signature
}

export default signPacket
