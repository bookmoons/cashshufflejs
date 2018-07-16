/**
 * Standard implementation of
 *     {@link module:cashshuffle/crypto~Crypto|message encryption}.
 *
 * Uses [jssha](https://www.npmjs.com/package/jssha) for hashing.
 * @module cashshuffle/crypto/standard
 */

import Crypto from './main'
import hash from './hash'

Object.assign(Crypto, {
  hash
})

export default Crypto
