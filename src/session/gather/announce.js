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
 * @prop {HexString} signingPublicKey - Shuffler signing public key.
 * @prop {number} amount - Amount to shuffle in satoshis.
 * @prop {number} fee - Shuffler fee amount in satoshis.
 *     The produced transaction will charge this fee to each shuffler.
 * @prop {Coin} coin - Bitcoin Cash network interface.
 * @prop {PhaseReceiver} receiver - Phase message receiver.
 * @prop {Receiver} [discarder=] - Receiver to discard messages to.
 * @prop {bitcore.Network} [network=<mainnet>] - Bitcoin Cash network.
 */

/**
 * Gather announce messages from other shufflers.
 *
 * Validates each received message.
 * Verifies sufficient funds for each valid message.
 *
 * Makes repeated attempts until max attempts exhausted or a network timeout
 * expires. An invalid message causes an additional attempt for a message
 * from that shuffler. Insufficient funds for any shuffler fails
 * the entire process.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {GatherAnnounceParams} params
 *
 * @return {Map<HexString,object>} Announce messages from all other
 *     shufflers. Index shuffler public key. Value packet as object.
 *
 * @throws {ExhaustionError} If attempts are exhausted without success.
 * @throws {TimeoutError} If wait for message times out.
 * @throws {InadequateError} If any shuffler has insufficient funds.
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
  const shufflerTotal = amount + fee
  const shufflerInboxes = receiver.shufflerInboxes
  shufflerInboxes.delete(signingPublicKey)
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
        await this.validateAnnounce(packet)
      } catch (e) {
        if (
          e instanceof MissingValueError ||
          e instanceof ValueError
        ) {
          if (discarder) await discarder.submit([ packet, e ])
          continue
        } else throw e
      }
      const publicKeyString = publicKeys[i]
      const publicKey = new bitcore.PublicKey(publicKeyString, { network })
      const address = publicKey.toAddress(network)
      const addressString = address.toCashAddress()
      const sufficientFunds = await coin.sufficientFunds(
        addressString,
        shufflerTotal
      )
      if (!sufficientFunds) {
        throw new InadequateError(
          { info: { address: addressString, amount } },
          'insufficient funds'
        )
      }
      shufflerPackets.set(publicKeyString, packet)
      shufflerInboxes.delete(publicKeyString)
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

export default gatherAnnounce
