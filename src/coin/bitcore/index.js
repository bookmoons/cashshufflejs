/**
 * [Bitcore][1] based implementation of Bitcoin Cash network operations.
 *
 * Uses:
 *
 * - [bitcore-lib-cash][2] for key operations.
 * - [&#64;bookmoons/bitcore-message-cash][3] for message verification.
 *
 * Network values are bitcore-lib-cash `Network` instances. Standard networks
 * are available through `bitcore.Networks`.
 *
 * [1]: https://bitcore.io/
 * [2]: https://www.npmjs.com/package/bitcore-lib-cash
 * [3]: https://www.npmjs.com/package/@bookmoons/bitcore-message-cash
 *
 * @module cashshuffle/coin/bitcore
 */

import BitcoreCoin from './main'
import address from './address'
import verifySignature from './verify'

Object.assign(BitcoreCoin.prototype, {
  address,
  verifySignature
})

Object.freeze(BitcoreCoin)

export default BitcoreCoin
