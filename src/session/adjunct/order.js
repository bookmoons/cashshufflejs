import bitcore from 'bitcore-lib-cash'
import { defaultNetwork } from '../default'

/**
 * Order shufflers.
 *
 * Deduplicates provided shufflers list.
 * Orders list lexicographically by address.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {Iterable<HexString>} shufflers - Shuffler signing public keys.
 * @param {bitcore.Network} [network=<mainnet>] - Bitcoin Cash network.
 *     Not modified.
 *
 * @return {Array<HexString>} Ordered shufflers list.
 */
async function orderShufflers (shufflers, network = defaultNetwork) {
  const keysSet = new Set(shufflers) // Deduplicate
  const keys = [ ...keysSet ]
  const addresses = []
  for (const keyString of keys) {
    const key = new bitcore.PublicKey(keyString, { network })
    const address = new bitcore.Address(key, network)
    const addressString = address.toCashAddress()
    addresses.push(addressString)
  }
  const addressKeys = new Map()
  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i]
    const key = keys[i]
    addressKeys.set(address, key)
  }
  addresses.sort()
  const keysOrdered = []
  for (const address of addresses) {
    const key = addressKeys.get(address)
    keysOrdered.push(key)
  }
  return keysOrdered
}

export default orderShufflers
