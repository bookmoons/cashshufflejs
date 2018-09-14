import { ExhaustionError, MissingValueError } from '../../error'
import { defaultAttempts, defaultTimeout } from '../default'

/**
 * @typedef {object} GatherFinalOutputParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {number} [attempts=<default>] - Maximum attempts. Positive integer.
 * @prop {number} [timeout=<default>] - Network operation timeout
 *     in milliseconds.
 * @prop {HexString} lastShuffler - Signing public key of last shuffler.
 * @prop {PhaseReceiver} receiver - Phase message receiver.
 * @prop {Receiver} [discarder=] - Receiver to discard messages to.
 */

/**
 * Gather final output list message from last shuffler.
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
  lastShuffler,
  receiver,
  discarder = null
}) {
  const shufflerInboxes = receiver.shufflerInboxes
  const inbox = shufflerInboxes.get(lastShuffler)
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
