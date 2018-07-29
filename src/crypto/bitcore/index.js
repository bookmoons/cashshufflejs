/**
 * Bitcore based implementation of
 *     {@link module:cashshuffle/crypto~Crypto|message encryption}.
 *
 * Uses: [crypto](https://nodejs.org/dist/latest-v10.x/docs/api/crypto.html)
 * for hashing.
 * @module cashshuffle/crypto/bitcore
 */

import Crypto from './main'
import hash from './hash'

Object.assign(Crypto, {
  hash
})

export default Crypto