import test from 'ava'
import bitcore from 'bitcore-lib-cash'
import Message from '@bookmoons/bitcore-message-cash'
import Signing from 'signing/bitcore/main'
import restoreKeyPair from 'signing/bitcore/restore'
import sign from 'signing/bitcore/sign'

const privateKeyString =
    '00000000000000000000000000000000000000000000000000' +
    '00000000000001'
const message = 'Test message'

test.before(t => {
  Object.assign(Signing.prototype, {
    restoreKeyPair,
    sign
  })
})

test('sign', async t => {
  const signing = new Signing()
  await signing.restoreKeyPair(privateKeyString)
  const signature = await signing.sign(message)
  const privateKey = new bitcore.PrivateKey(privateKeyString)
  const address = privateKey.toAddress()
  const verifier = new Message(message)
  const valid = verifier.verify(address, signature)
  t.true(valid)
})
