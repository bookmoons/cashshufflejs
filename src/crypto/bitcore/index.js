/**
 * [Bitcore][1] based implementation of message encryption.
 *
 * Uses:
 *
 * - [crypto][2] for hashing.
 * - [bitcore-lib-cash][3] for key operations.
 * - [&#64;bookmoons/bitcore-ecies-cash][4] for encryption operations.
 *
 * Network values are bitcore-lib-cash `Network` instances. Standard networks
 * are available through `bitcore.Networks`.
 *
 * [1]: https://bitcore.io/
 * [2]: https://nodejs.org/dist/latest/docs/api/crypto.html
 * [3]: https://www.npmjs.com/package/bitcore-lib-cash
 * [4]: https://www.npmjs.com/package/@bookmoons/bitcore-ecies-cash
 *
 * @module cashshuffle/crypto/bitcore
 */

import Crypto from './main'
import decrypt from './decrypt'
import encrypt from './encrypt'
import exportPrivateKey from './exportpriv'
import exportPublicKey from './exportpub'
import generateKeyPair from './generate'
import hash from './hash'
import restoreKeyPair from './restore'

Object.assign(Crypto.prototype, {
  decrypt,
  encrypt,
  exportPrivateKey,
  exportPublicKey,
  generateKeyPair,
  hash,
  restoreKeyPair
})

export default Crypto
