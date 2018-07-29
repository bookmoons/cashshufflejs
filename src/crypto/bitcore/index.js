/**
 * [Bitcore][1] based implementation of
 *     {@link module:cashshuffle/crypto~Crypto|message encryption}.
 *
 * Uses:
 * - [crypto][2] for hashing.
 * - [bitcore-lib][3] for key operations.
 *
 * Network values are bitcore-lib `Network` instances. Standard networks are
 * available through `bitcore.Networks`.
 *
 * [1]: https://bitcore.io/
 * [2]: https://nodejs.org/dist/latest/docs/api/crypto.html
 * [3]: https://www.npmjs.com/package/bitcore-lib
 *
 * @module cashshuffle/crypto/bitcore
 */

import Crypto from './main'
import generateKeyPair from './generate'
import hash from './hash'

Object.assign(Crypto, {
  generateKeyPair,
  hash
})

export default Crypto
