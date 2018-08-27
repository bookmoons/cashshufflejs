import bitcore from 'bitcore-lib-cash'
import { MissingValueError, ValueError } from '../../error'

/**
 * Validate an announcement message.
 *
 * No return value.
 * Throws error if validation fails.
 * Returns without error if validation succeeds.
 *
 * @memberof cashshuffle/session~Session
 *
 * @param {object} packet - Packet to validate as object.
 *
 * @throws {MissingValueError} If a required value is missing.
 * @throws {ValueError} If contained encryption public key is invalid.
 */
async function validateAnnounce (packet) {
  const fieldMessage = packet.message
  if (typeof fieldMessage !== 'object') {
    throw new MissingValueError('message')
  }
  const fieldKey = fieldMessage.key
  if (typeof fieldKey !== 'object') {
    throw new MissingValueError('message.key')
  }
  const encryptionPublicKeyString = fieldKey.key
  if (typeof encryptionPublicKeyString !== 'string') {
    throw new MissingValueError('message.key.key')
  }
  const keyValid = bitcore.PublicKey.isValid(encryptionPublicKeyString)
  if (!keyValid) {
    throw new ValueError(
      { info: { key: encryptionPublicKeyString } },
      'invalid key'
    )
  }
}

export default validateAnnounce
