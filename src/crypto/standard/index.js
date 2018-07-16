/**
 * Standard implementation of
 *     {@link module:cashshuffle/crypto~Crypto|message encryption}.
 *
 * Uses: [jssha](https://www.npmjs.com/package/jssha) for hashing.
 * [bitcoinjs-lib](https://www.npmjs.com/package/bitcoinjs-lib) and
 * [wif](https://www.npmjs.com/package/wif) for key and encryption operations.
 * @module cashshuffle/crypto/standard
 */

import Crypto from './main'
import exportPrivateKey from './exportpriv'
import exportPublicKey from './exportpub'
import generateKeyPair from './generate'
import hash from './hash'

Object.assign(Crypto, {
  exportPrivateKey,
  exportPublicKey,
  generateKeyPair,
  hash
})

export default Crypto
