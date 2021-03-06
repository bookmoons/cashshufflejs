import { ExhaustionError, MissingValueError } from '/error'
import Fetcher from '/fetcher/each'
import { bytesToHex } from '/aid/convert'
import { defaultAttempts, defaultTimeout } from '../default'

/**
 * @typedef {object} GatherSignatureParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {number} [attempts=<default>] - Maximum attempts. Positive integer.
 * @prop {number} [timeout=<default>] - Network operation timeout
 *     in milliseconds.
 * @prop {Uint8Array} signingPublicKey - Shuffler signing public key.
 *     Not modified.
 * @prop {PhaseReceiver} receiver - Phase message receiver.
 * @prop {Receiver} [discarder=] - Receiver to discard messages to.
 */

/**
 * Gather signature messages from other shufflers.
 *
 * Validates each received message.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {GatherDigestParams} params
 *
 * @return {Map<HexString,object>} Signature messages from all other
 *     shufflers. Index shuffler public key. Value packet as object.
 *
 * @throws {ExhaustionError} If attempts are exhausted without success.
 * @throws {TimeoutError} If wait for message times out.
 */
async function gatherSignature ({
  attempts = defaultAttempts,
  timeout = defaultTimeout,
  signingPublicKey,
  receiver,
  discarder = null
}) {
  const shufflerInboxes = receiver.shufflerInboxes
  const signingPublicKeyHex = bytesToHex(signingPublicKey)
  shufflerInboxes.delete(signingPublicKeyHex)
  const shufflersCount = shufflerInboxes.size
  const shufflerPackets = new Map()
  for (let remaining = attempts; remaining > 0; remaining--) {
    const publicKeys = [ ...shufflerInboxes.keys() ]
    const inboxes = [ ...shufflerInboxes.values() ]
    const fetcher = new Fetcher(inboxes)
    const packets = await fetcher.fetch(timeout)
    for (let i = 0; i < packets.length; i++) {
      const packet = packets[i]
      try {
        await this.validateSignature(packet)
      } catch (e) {
        if (e instanceof MissingValueError) {
          if (discarder) await discarder.submit([ packet, e ])
          continue
        } else throw e
      }
      const publicKey = publicKeys[i]
      shufflerPackets.set(publicKey, packet)
      shufflerInboxes.delete(publicKey)
    }
    if (shufflerPackets.size === shufflersCount) {
      return shufflerPackets
    }
  }
  throw new ExhaustionError(
    { info: {
      attempts,
      total: shufflersCount,
      acquired: shufflerPackets.size
    } },
    'max attempts'
  )
}

export default gatherSignature
