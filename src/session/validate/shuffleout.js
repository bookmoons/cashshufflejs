import { MissingValueError } from '/error'

/**
 * Validate a shuffle output item message.
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
async function validateShuffleOutput (packet) {
  const fieldToKey = packet.toKey
  if (typeof fieldToKey !== 'object') {
    throw new MissingValueError('to_key')
  }
  const toKey = fieldToKey.key
  if (!toKey) {
    throw new MissingValueError('to_key.key')
  }
  const fieldMessage = packet.message
  if (typeof fieldMessage !== 'object') {
    throw new MissingValueError('message')
  }
  const str = fieldMessage.str
  if (!str) {
    throw new MissingValueError('message.str')
  }
}

export default validateShuffleOutput
