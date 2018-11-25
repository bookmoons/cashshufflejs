import bitcore from 'bitcore-lib-cash'
import { MissingValueError } from '/error'
import { cryptEncodeString } from '/aid/code'
import { bytesToBase64, hexToBytes } from '/aid/convert'

const mainnet = bitcore.Networks.mainnet

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
 * @param {bitcore.Network} [network=<mainnet>] - Bitcoin Cash network.
 *     Not modified.
 *
 * @return {Base64} The final cryptogram.
 *
 * @throws {MissingValueError} If encryption public keys is empty.
 */
async function encryptLayered (
  crypto,
  message,
  encryptionPublicKeys,
  network = mainnet
) {
  const recipients = [ ...encryptionPublicKeys ]
  if (!recipients.length) {
    throw new MissingValueError('No encryption keys')
  }

  // Initial encryption from string
  const layer = await encryptMessage(crypto, message, recipients, network)

  // Subsequent encryptions from bytes
  const cryptogram = await encryptLayers(crypto, layer, recipients, network)
  const cryptogramBase64 = bytesToBase64(cryptogram)
  return cryptogramBase64
}

/**
 * @param {Crypto} crypto - Message encryptor. Assumed ready for use.
 * @param {string} message - Message to encrypt.
 * @param {Array<HexString>} recipients - Public keys to encrypt for in
 *     encryption order. Minimum 1 item.
 * @param {bitcore.Network} network - Bitcoin Cash network. Not modified.
 *
 * @return {Uint8Array} `message` encrypted for first recipient.
 */
async function encryptMessage (
  crypto,
  message,
  recipients,
  network
) {
  const recipient = recipients.shift()
  const recipientBytes = hexToBytes(recipient)
  const messageEncoded = cryptEncodeString(message)
  const cryptogram = await crypto.encryptBytes(
    messageEncoded,
    recipientBytes,
    network
  )
  return cryptogram
}

/**
 * @param {Crypto} crypto - Message encryptor. Assumed ready for use.
 * @param {Uint8Array} layer - Bytes to encrypt. Previous encryption result.
 * @param {Array<HexString>} recipients - Public keys to encrypt for in
 *     encryption order.
 * @param {bitcore.Network} network - Bitcoin Cash network. Not modified.
 *
 * @return {Uint8Array} `layer` encrypted for all subsequent recipients in
 *     encryption order.
 */
async function encryptLayers (
  crypto,
  layer,
  recipients,
  network
) {
  if (!recipients.length) return layer
  const recipient = recipients.shift()
  const recipientBytes = hexToBytes(recipient)
  const layerBase64 = bytesToBase64(layer)
  const layerEncoded = cryptEncodeString(layerBase64)
  const cryptogram = await crypto.encryptBytes(
    layerEncoded,
    recipientBytes,
    network
  )
  return encryptLayers(crypto, cryptogram, recipients, network)
}

export default encryptLayered
