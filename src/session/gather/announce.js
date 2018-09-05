import bitcore from 'bitcore-lib-cash'
import {
  ExhaustionError,
  InadequateError,
  MissingValueError,
  ValueError
} from '../../error'
import Fetcher from 'fetcher/each'
import { defaultAttempts, defaultTimeout } from '../default'

/**
 * @typedef {object} GatherAnnounceParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {number} [attempts=<default>] - Maximum attempts. Positive integer.
 * @prop {number} [timeout=<default>] - Network operation timeout
 *     in milliseconds.
 * @prop {HexString} signingPublicKey - Participant signing public key.
 * @prop {number} amount - Amount to shuffle in satoshis.
 * @prop {Coin} coin - Bitcoin Cash network interface.
 * @prop {Receiver} receiver - Phase message receiver.
 * @prop {Receiver} [discarder=null] - Receiver to discard messages to.
 */

/**
 * Gather announce messages from other participants.
 *
 * Validates each received message.
 * Verifies sufficient funds for each valid message.
 *
 * Makes repeated attempts until max attempts exhausted or a network timeout
 * expires. An invalid message causes an additional attempt for a message
 * from that participant. Insufficient funds for any participant fails
 * the entire process.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {GatherAnnounceParams} params
 *
 * @return {Map<string,object>} Announce messages from all other participants.
 *     Index participant public key as hex string. Value packet as object.
 *
 * @throws {ExhaustionError} If attempts are exhausted without success.
 * @throws {InadequateError} If any participant has insufficient funds.
 */
async function gatherAnnounce ({
  attempts = defaultAttempts,
  timeout = defaultTimeout,
  signingPublicKey,
  amount,
  coin,
  receiver,
  discarder = null
}) {
  const participantInboxes = receiver.participantInboxes
  participantInboxes.delete(signingPublicKey)
  const participantsCount = participantInboxes.size
  const participantPackets = new Map()
  for (; attempts > 0; attempts--) {
    const publicKeys = [ ...participantInboxes.keys() ]
    const inboxes = [ ...participantInboxes.values() ]
    const fetcher = new Fetcher(inboxes)
    const packets = await fetcher.fetch(timeout)
    for (let i = 0; i < packets.length; i++) {
      const packet = packets[i]
      try {
        await this.validateAnnounce(packet)
      } catch (e) {
        if (
          e instanceof MissingValueError ||
          e instanceof ValueError
        ) {
          if (discarder) await discarder.submit([ e, packet ])
          continue
        } else throw e
      }
      const publicKeyString = publicKeys[i]
      const publicKey = new bitcore.PublicKey(publicKeyString)
      const address = publicKey.toAddress()
      const addressString = address.toString()
      const sufficientFunds = await coin.sufficientFunds(addressString, amount)
      if (!sufficientFunds) {
        throw new InadequateError(
          { info: { address: addressString, amount } },
          'insufficient funds'
        )
      }
      participantPackets.set(publicKeyString, packet)
      participantInboxes.delete(publicKeyString)
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

export default gatherAnnounce
