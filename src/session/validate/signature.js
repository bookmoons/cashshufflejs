import { MissingValueError } from '../../error'

/**
 * Validate a signature message.
 *
 * No return value.
 * Throws error if validation fails.
 * Returns without error if validation succeeds.
 *
 * @memberof cashshuffle/session.Session
 *
 * @param {object} packet - Packet to validate as object. Not modified.
 *
 * @throws {MissingValuError} If a required value is missing.
 */
async function validateSignature (packet) {
  const fieldMessage = packet.message
  if (typeof fieldMessage !== 'object') {
    throw new MissingValueError('message')
  }
  const inputSignatures = fieldMessage.signatures
  if (!inputSignatures) {
    throw new MissingValueError('message.signatures')
  }
  for (let i = 0; i < inputSignatures.length; i++) {
    const inputSignature = inputSignatures[i]
    const fieldSignature = inputSignature.signature
    const signature = fieldSignature.signature
    if (!signature) {
      throw new MissingValueError(
        { info: { index: i } },
        'message.signatures.signature.signature'
      )
    }
  }
}

export default validateSignature
