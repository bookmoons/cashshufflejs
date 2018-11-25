import { MissingValueError } from '/error'

/**
 * Validate a digest message.
 *
 * No return value.
 * Throws error if validation fails.
 * Returns without error if validation succeeds.
 *
 * @memberof cashshuffle/session.Session
 *
 * @param {object} packet - Packet to validate as object. Not modified.
 *
 * @throws {MissingValueError} If a required value is missing.
 */
async function validateDigest (packet) {
  const fieldMessage = packet.message
  if (typeof fieldMessage !== 'object') {
    throw new MissingValueError('message')
  }
  const fieldHash = fieldMessage.hash
  if (typeof fieldHash !== 'object') {
    throw new MissingValueError('message.hash')
  }
  if (!fieldHash.hash) {
    throw new MissingValueError('message.hash.hash')
  }
}

export default validateDigest
