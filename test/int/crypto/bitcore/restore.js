import test from 'ava'
import { hexToBytes } from 'aid/convert'
import privs from 'crypto/bitcore/privs'
import Crypto from 'crypto/bitcore/main'
import restoreKeyPair from 'crypto/bitcore/restore'

const undef = void 0

const privateKeyHex =
  '0000000000000000000000000000000000000000000000000000000000000001'
const privateKey = hexToBytes(privateKeyHex)

test.before(t => {
  Object.assign(Crypto.prototype, {
    restoreKeyPair
  })
})

test('restore', async t => {
  const crypto = new Crypto()
  await crypto.restoreKeyPair(privateKey)
  const priv = privs.get(crypto)
  await t.not(priv.keyPair, undef)
})
