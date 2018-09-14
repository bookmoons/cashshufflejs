import { ExhaustionError, MissingValueError } from '../../error'
import { defaultAttempts, defaultTimeout } from '../default'

/**
 * @typedef {object} GatherFinalOutputParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {number} [attempts=<default>] - Maximum attempts. Positive integer.
 * @prop {number} [timeout=<default>] - Network operation timeout
 *     in milliseconds.
 * @prop {HexString} lastParticipant - Signing public key of last participant.
 * @prop {PhaseReceiver} receiver - Phase message receiver.
 * @prop {Receiver} [discarder=null] - Receiver to discard messages to.
 */

/**
 * Gather final output list message from last participant.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {GatherFinalOutputParams} params
 *
 * @return {object} `protocol.Packet` portion of final output list message
 *     as object.
 *
 * @throws {ExhaustionError} If attempts are exhausted without success.
 * @throws {TimeoutError} If wait for message times out.
 */
async function gatherFinalOutput ({
  attempts = defaultAttempts,
  timeout = defaultTimeout,
  lastParticipant,
  receiver,
  discarder = null
}) {
  const participantInboxes = receiver.participantInboxes
  const inbox = participantInboxes.get(lastParticipant)
  for (let remaining = attempts; remaining > 0; remaining--) {
    const packet = await inbox.watch(timeout)
    try {
      await this.validateFinalOutput(packet)
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

export default gatherFinalOutput
