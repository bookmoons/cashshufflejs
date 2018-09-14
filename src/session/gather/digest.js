import { ExhaustionError, MissingValueError } from '../../error'
import Fetcher from 'fetcher/each'
import { defaultAttempts, defaultTimeout } from '../default'

/**
 * @typedef {object} GatherDigestParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {number} [attempts=<default>] - Maximum attempts. Positive integer.
 * @prop {number} [timeout=<default>] - Network operation timeout
 *     in milliseconds.
 * @prop {HexString} signingPublicKey - Participant signing public key.
 * @prop {PhaseReceiver} receiver - Phase message receiver.
 * @prop {Receiver} [discarder=] - Receiver to discard messages to.
 */

/**
 * Gather digest messages from other participants.
 *
 * Validates each received message.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {GatherDigestParams} params
 *
 * @return {Map<HexString,object>} Digest messages from all other
 *     participants. Index participant public key. Value packet as object.
 *
 * @throws {ExhaustionError} If attempts are exhausted without success.
 * @throws {TimeoutError} If wait for message times out.
 */
async function gatherDigest ({
  attempts = defaultAttempts,
  timeout = defaultTimeout,
  signingPublicKey,
  receiver,
  discarder = null
}) {
  const participantInboxes = receiver.participantInboxes
  participantInboxes.delete(signingPublicKey)
  const participantsCount = participantInboxes.size
  const participantPackets = new Map()
  for (let remaining = attempts; remaining > 0; remaining--) {
    const publicKeys = [ ...participantInboxes.keys() ]
    const inboxes = [ ...participantInboxes.values() ]
    const fetcher = new Fetcher(inboxes)
    const packets = await fetcher.fetch(timeout)
    for (let i = 0; i < packets.length; i++) {
      const packet = packets[i]
      try {
        await this.validateDigest(packet)
      } catch (e) {
        if (e instanceof MissingValueError) {
          if (discarder) await discarder.submit([ e, packet ])
          continue
        } else throw e
      }
      const publicKey = publicKeys[i]
      participantPackets.set(publicKey, packet)
      participantInboxes.delete(publicKey)
    }
    if (participantPackets.size === participantsCount) {
      return participantPackets
    }
  }
  throw new ExhaustionError(
    { info: {
      attempts,
      total: participantsCount,
      acquired: participantPackets.size
    } },
    'max attempts'
  )
}

export default gatherDigest
