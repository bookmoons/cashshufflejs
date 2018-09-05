import { ExhaustionError, MissingValueError } from '../../error'
import { defaultAttempts, defaultTimeout } from '../default'

/**
 * @typedef {object} GatherOutputListParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {number} [attempts=<default>] - Maximum attempts. Positive integer.
 * @prop {number} [timeout=<default>] - Network operation timeout
 *     in milliseconds.
 * @prop {HexString} signingPublicKey - Participant signing public key.
 * @prop {HexString} priorParticipant - Signing public key of prior
 *     participant.
 * @prop {Receiver} receiver - Phase message receiver.
 * @prop {Receiver} [discarder=null] - Receiver to discard messages to.
 */

/**
 * Gather output list message from prior participant.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {GatherOutputListParams} params
 *
 * @return {object} `protocol.Packet` portion of output list message as object.
 *
 * @throws {ExhaustionError} If attempts are exhausted without success.
 */
async function gatherOutputList ({
  attempts = defaultAttempts,
  timeout = defaultTimeout,
  signingPublicKey,
  priorParticipant,
  receiver,
  discarder = null
}) {
  const participantInboxes = receiver.participantInboxes
  const inbox = participantInboxes.get(priorParticipant)
  for (; attempts > 0; attempts--) {
    const packet = await inbox.watch(timeout)
    try {
      await this.validateOutputList(packet)
    } catch (e) {
      if (e instanceof MissingValueError) {
        if (discarder) await discarder.submit([ e, packet ])
        continue
      } else throw e
    }
    return packet
  }
  throw new ExhaustionError(
    { info: { attempts } },
    'max attempts'
  )
}

export default gatherOutputList
