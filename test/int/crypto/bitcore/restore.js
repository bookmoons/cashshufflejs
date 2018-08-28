import test from 'ava'
import privs from 'crypto/bitcore/privs'
import Crypto from 'crypto/bitcore/main'
import restoreKeyPair from 'crypto/bitcore/restore'

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
