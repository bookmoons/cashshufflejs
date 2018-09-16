import { MissingValueError } from '../../error'

/**
 * Validate a final output item message.
 *
 * No return value.
 * Throws error if validation fails.
 * Returns without error if validation succeeds.
 *
 * @memberof cashshuffle/session.Session
 *
 * @param {object} packet - Packet to validate as object.
 *
 * @throws {MissingValueError} If a required value is missing.
 */
async function validateFinalOutput (packet) {
  const fieldMessage = packet.message
  if (typeof fieldMessage !== 'object') {
    throw new MissingValueError('message')
  }
  const str = fieldMessage.str
  if (!str) {
    throw new MissingValueError('message.str')
  }
}

export default validateFinalOutput
