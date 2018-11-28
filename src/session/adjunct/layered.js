import bitcore from 'bitcore-lib-cash'
import { MissingValueError } from '/error'
import { cryptEncodeBytes } from '/aid/code'
import { hexToBytes } from '/aid/convert'

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
 * @param {Uint8Array} message - Message to encrypt. Not modified.
 * @param {Iterable<HexString>} encryptionPublicKeys - Public keys to encrypt
 *     for in encryption order. Minimum 1 item.
 * @param {bitcore.Network} [network=<mainnet>] - Bitcoin Cash network.
 *     Not modified.
 *
 * @return {Uint8Array} The final cryptogram.
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
  const layer = await encryptMessage(crypto, message, recipients, network)
  return encryptLayers(crypto, layer, recipients, network)
}

/**
 * @param {Crypto} crypto - Message encryptor. Assumed ready for use.
 * @param {Uint8Array} message - Message to encrypt. Not modified.
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
  const cryptogram = await crypto.encryptBytes(
    message,
    recipientBytes,
    network
  )
  return cryptogram
}

/**
 * @param {Crypto} crypto - Message encryptor. Assumed ready for use.
 * @param {Uint8Array} layer - Bytes to encrypt. Previous encryption result.
 *     Not modified.
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
  const layerEncoded = cryptEncodeBytes(layer)
  const cryptogram = await crypto.encryptBytes(
    layerEncoded,
    recipientBytes,
    network
  )
  return encryptLayers(crypto, cryptogram, recipients, network)
}

export default encryptLayered
