import { ExhaustionError, MissingValueError } from '../../error'
import { defaultAttempts, defaultTimeout } from '../default'

/**
 * @typedef {object} GatherOutputListParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {number} [attempts=<default>] - Maximum attempts. Positive integer.
 * @prop {number} [timeout=<default>] - Network operation timeout
 *     in milliseconds.
 * @prop {HexString} priorShuffler - Signing public key of prior
 *     shuffler.
 * @prop {PhaseReceiver} receiver - Phase message receiver.
 * @prop {Receiver} [discarder=] - Receiver to discard messages to.
 */

/**
 * Gather output list message from prior shuffler.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {GatherOutputListParams} params
 *
 * @return {object} `protocol.Packet` portion of output list message as object.
 *
 * @throws {ExhaustionError} If attempts are exhausted without success.
 * @throws {TimeoutError} If wait for message times out.
 */
async function gatherOutputList ({
  attempts = defaultAttempts,
  timeout = defaultTimeout,
  priorShuffler,
  receiver,
  discarder = null
}) {
  const shufflerInboxes = receiver.shufflerInboxes
  const inbox = shufflerInboxes.get(priorShuffler)
  for (let remaining = attempts; remaining > 0; remaining--) {
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
