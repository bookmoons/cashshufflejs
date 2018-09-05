/**
 * [Bitcore][1] based implementation of message signing.
 *
 * Uses:
 *
 * - [bitcore-lib-cash][2] for key operations.
 * - [&#64;bookmoons/bitcore-message-cash][3] for signing operations.
 *
 * Network values are bitcore-lib-cash `Network` instances. Standard networks
 * are avaialble through `bitcore.Networks`.
 *
 * [1]: https://bitcore.io/
 * [2]: https://www.npmjs.com/package/bitcore-lib-cash
 * [3]: https://www.npmjs.com/package/@bookmoons/bitcore-message-cash
 *
 * @module cashshuffle/signing/bitcore
 */

import Signing from './main'
import address from './address'
import exportPrivateKey from './exportpriv'
import exportPublicKey from './exportpub'
import generateKeyPair from './generate'
import restoreKeyPair from './restore'
import sign from './sign'

Object.assign(Signing.prototype, {
  address,
  exportPrivateKey,
  exportPublicKey,
  generateKeyPair,
  restoreKeyPair,
  sign
})

export default Signing
