import test from 'ava'
import privs from 'signing/bitcore/privs'
import Signing from 'signing/bitcore/main'
import restoreKeyPair from 'signing/bitcore/restore'

const undef = void 0

const privateKeyString =
    '00000000000000000000000000000000000000000000000000' +
    '00000000000001'

test.before(t => {
  Object.assign(Signing.prototype, {
    restoreKeyPair
  })
})

test('restore', async t => {
  const signing = new Signing()
  await signing.restoreKeyPair(privateKeyString)
  const priv = privs.get(signing)
  await t.not(priv.keyPair, undef)
})
