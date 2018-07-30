import test from 'ava'
import privs from 'crypto/standard/privs'
import Crypto from 'crypto/standard/main'
import restoreKeyPair from 'crypto/standard/restore'

const undef = void 0

const privateKeyString =
    '00000000000000000000000000000000000000000000000000' +
    '00000000000001'

test.before(t => {
  Object.assign(Crypto.prototype, {
    restoreKeyPair
  })
})

test('restore', async t => {
  const crypto = new Crypto()
  await crypto.restoreKeyPair(privateKeyString)
  const priv = privs.get(crypto)
  await t.not(priv.keyPair, undef)
})
