import bitcore from 'bitcore-lib-cash'
import {
  ExhaustionError,
  InadequateError,
  MissingValueError,
  ValueError
} from '../../error'
import Fetcher from 'fetcher/each'
import { defaultAttempts, defaultNetwork, defaultTimeout } from '../default'

/**
 * @typedef {object} GatherAnnounceParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {number} [attempts=<default>] - Maximum attempts. Positive integer.
 * @prop {number} [timeout=<default>] - Network operation timeout
 *     in milliseconds.
 * @prop {HexString} signingPublicKey - Participant signing public key.
 * @prop {number} amount - Amount to shuffle in satoshis.
 * @prop {number} fee - Participant fee amount in satoshis.
 *     The produced transaction will charge this fee to each participant.
 * @prop {Coin} coin - Bitcoin Cash network interface.
 * @prop {PhaseReceiver} receiver - Phase message receiver.
 * @prop {Receiver} [discarder=null] - Receiver to discard messages to.
 * @prop {bitcore.Network} [network=<mainnet>] - Bitcoin Cash network.
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
 * @return {Map<HexString,object>} Announce messages from all other
 *     participants. Index participant public key. Value packet as object.
 *
 * @throws {ExhaustionError} If attempts are exhausted without success.
 * @throws {TimeoutError} If wait for message times out.
 * @throws {InadequateError} If any participant has insufficient funds.
 */
async function gatherAnnounce ({
  attempts = defaultAttempts,
  timeout = defaultTimeout,
  signingPublicKey,
  amount,
  fee,
  coin,
  receiver,
  discarder = null,
  network = defaultNetwork
}) {
  const participantTotal = amount + fee
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
      const publicKey = new bitcore.PublicKey(publicKeyString, { network })
      const address = publicKey.toAddress(network)
      const addressString = address.toCashAddress()
      const sufficientFunds = await coin.sufficientFunds(
        addressString,
        participantTotal
      )
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
