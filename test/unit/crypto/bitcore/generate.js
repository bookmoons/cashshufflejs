import test from 'ava'
import privs from 'crypto/bitcore/privs'
import Crypto from 'crypto/bitcore/main'
import generateKeyPair from 'crypto/bitcore/generate'

const undef = void 0

test.before(t => {
  Object.assign(Crypto.prototype, {
    generateKeyPair
  })
})

test('generate', async t => {
  const crypto = new Crypto()
  await crypto.generateKeyPair()
  const priv = privs.get(crypto)
  await t.not(priv.keyPair, undef)
})
