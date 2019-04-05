import PersistFetcher from '/fetcher/persist'
import { bytesToHex } from '/aid/convert'
import { defaultAttempts, defaultTimeout } from '../default'

/**
 * @typedef {object} GatherShuffleOutputParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {number} [attempts=<default>] - Maximum attempts. Positive integer.
 * @prop {number} [timeout=<default>] - Network operation timeout
 *     in milliseconds.
 * @prop {Uint8Array} priorShuffler - Signing public key of prior shuffler.
 * @prop {number} precedingShufflersCount - Count of preceding shufflers.
 * @prop {PhaseReceiver} receiver - Phase message receiver.
 * @prop {Receiver} [discarder=] - Receiver to discard messages to.
 */

/**
 * Gather shuffle output messages from prior shuffler.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {GatherShuffleOutputParams} params
 *
 * @return {Array<object>} `protocol.Packet` portions of shuffle output
 *     messages. Provided in order observed in message stream.
 *
 * @throws {ExhaustionError} If attempts are exhausted without success.
 * @throws {TimeoutError} If wait for message times out.
 */
async function gatherShuffleOutput ({
  attempts = defaultAttempts,
  timeout = defaultTimeout,
  priorShuffler,
  precedingShufflersCount,
  receiver,
  discarder = null
}) {
  const self = this
  const shufflerInboxes = receiver.shufflerInboxes
  const priorShufflerHex = bytesToHex(priorShuffler)
  const inbox = shufflerInboxes.get(priorShufflerHex)
  const evaluator = async function evaluateShuffleOutputMessage (packet) {
    try { await self.validateShuffleOutput(packet) } catch (e) { return e }
  }
  const fetcher = new PersistFetcher(inbox, evaluator, discarder)
  const packets = []
  for (
    let remaining = precedingShufflersCount;
    remaining > 0;
    remaining--
  ) {
    const packet = await fetcher.fetch(attempts, timeout)
    packets.push(packet)
  }
  return packets
}

export default gatherShuffleOutput
