import { MissingValueError } from '../../error'

/**
 * Perform layered encryption of message.
 *
 * Encrypts recursively for the provided public keys in the provided order.
 * Each cryptogram is encrypted as a `Base64` value.
 * Final result is a `Base64` value.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {Crypto} crypto - Message encryptor. Assumed ready for use.
 * @param {string} message - Message to encrypt.
 * @param {Iterable<HexString>} encryptionPublicKeys - Public keys to encrypt
 *     for in encryption order. Minimum 1 item.
 *
 * @return {Base64} The final cryptogram.
 *
 * @throws {MissingValueError} If encryption public keys is empty.
 */
async function encryptLayered (crypto, message, encryptionPublicKeys) {
  const encryptionPublicKeysArray = [ ...encryptionPublicKeys ]
  if (!encryptionPublicKeysArray.length) {
    throw new MissingValueError('No encryption keys')
  }
  return encryptLayeredStep(crypto, message, encryptionPublicKeysArray)
}

async function encryptLayeredStep (crypto, message, encryptionPublicKeys) {
  if (!encryptionPublicKeys.length) return message
  const encryptionPublicKey = encryptionPublicKeys.shift()
  const cryptogram = await crypto.encrypt(message, encryptionPublicKey)
  return encryptLayeredStep(crypto, cryptogram, encryptionPublicKeys)
}

export default encryptLayered