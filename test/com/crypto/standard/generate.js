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

test('generate', async t => {
  const crypto = new Crypto()
  await crypto.generateKeyPair()
  const priv = privs.get(crypto)
  await t.not(priv.keyPair, undef)
})
