import test from 'ava'
import privs from 'crypto/standard/privs'
import Crypto from 'crypto/standard/main'
import generateKeyPair from 'crypto/standard/generate'

const undef = void 0

test.before(t => {
  Object.assign(Crypto.prototype, {
    generateKeyPair
  })
})

test('generate', t => {
  const crypto = new Crypto()
  crypto.generateKeyPair()
  const priv = privs.get(crypto)
  t.not(priv.keyPair, undef)
})
