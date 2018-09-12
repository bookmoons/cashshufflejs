import test from 'ava'
import Crypto from 'crypto/base'
import BitcoreCrypto from 'crypto/bitcore'

test('subclass', t => {
  const crypto = new BitcoreCrypto()
  t.true(crypto instanceof Crypto)
})
