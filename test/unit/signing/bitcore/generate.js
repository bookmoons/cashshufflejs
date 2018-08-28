import test from 'ava'
import privs from 'signing/bitcore/privs'
import Signing from 'signing/bitcore/main'
import generateKeyPair from 'signing/bitcore/generate'

const undef = void 0

test.before(t => {
  Object.assign(Signing.prototype, {
    generateKeyPair
  })
})

test('generate', async t => {
  const signing = new Signing()
  await signing.generateKeyPair()
  const priv = privs.get(signing)
  await t.not(priv.keyPair, undef)
})
