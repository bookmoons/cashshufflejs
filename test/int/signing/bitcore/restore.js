import test from 'ava'
import { hexToBytes } from 'aid/convert'
import privs from 'signing/bitcore/privs'
import Signing from 'signing/bitcore/main'
import restoreKeyPair from 'signing/bitcore/restore'

const undef = void 0

const privateKeyHex =
  '0000000000000000000000000000000000000000000000000000000000000001'
const privateKey = hexToBytes(privateKeyHex)

test.before(t => {
  Object.assign(Signing.prototype, {
    restoreKeyPair
  })
})

test('restore', async t => {
  const signing = new Signing()
  await signing.restoreKeyPair(privateKey)
  const priv = privs.get(signing)
  await t.not(priv.keyPair, undef)
})
