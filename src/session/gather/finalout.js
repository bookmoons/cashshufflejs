import PersistFetcher from '/fetcher/persist'
import { bytesToHex } from '/aid/convert'
import { defaultAttempts, defaultTimeout } from '../default'

/**
 * @typedef {object} GatherFinalOutputParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {number} [attempts=<default>] - Maximum attempts. Positive integer.
 * @prop {number} [timeout=<default>] - Network operation timeout
 *     in milliseconds.
 * @prop {Uint8Array} lastShuffler - Signing public key of last shuffler.
 *     Not modified.
 * @prop {number} shufflersCount - Count of shufflers.
 * @prop {PhaseReceiver} receiver - Phase message receiver.
 * @prop {Receiver} [discarder=] - Discarded message handler.
 */

/**
 * Gather final output messages from last shuffler.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {GatherFinalOutputParams} params
 *
 * @return {Array<object>} `protocol.Packet` portions of final output messages.
 *     Provided in order observe in message stream.
 *
 * @throws {ExhaustiionError} If attempts are exhausted without success.
 * @throws {TimeoutError} If wait for message times out.
 */
async function gatherFinalOutput ({
  attempts = defaultAttempts,
  timeout = defaultTimeout,
  lastShuffler,
  shufflersCount,
  receiver,
  discarder = null
}) {
  const self = this
  const shufflerInboxes = receiver.shufflerInboxes
  const lastShufflerHex = bytesToHex(lastShuffler)
  const inbox = shufflerInboxes.get(lastShufflerHex)
  const evaluator = async function evaluateFinalOutputMessage (packet) {
    try { await self.validateFinalOutput(packet) } catch (e) { return e }
  }
  const fetcher = new PersistFetcher(inbox, evaluator, discarder)
  const packets = []
  for (
    let remaining = shufflersCount;
    remaining > 0;
    remaining--
  ) {
    const packet = await fetcher.fetch(attempts, timeout)
    packets.push(packet)
  }
  return packets
}

export default gatherFinalOutput
