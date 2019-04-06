import test from 'ava'
import bitcore from 'bitcore-lib-cash'
import { bytesToBase64, hexToBytes } from 'aid/convert'
import Message from '@bookmoons/bitcore-message-cash'
import Signing from 'signing/bitcore/main'
import restoreKeyPair from 'signing/bitcore/restore'
import sign from 'signing/bitcore/sign'

const privateKeyHex =
  '0000000000000000000000000000000000000000000000000000000000000001'
const privateKeyBytes = hexToBytes(privateKeyHex)
const message = 'Test message'

test.before(t => {
  Object.assign(Signing.prototype, {
    restoreKeyPair,
    sign
  })
})

test('sign', async t => {
  const signing = new Signing()
  await signing.restoreKeyPair(privateKeyBytes)
  const signature = await signing.sign(message)
  const privateKey = new bitcore.PrivateKey(privateKeyHex)
  const address = privateKey.toAddress()
  const verifier = new Message(message)
  const signatureBase64 = bytesToBase64(signature)
  const valid = verifier.verify(address, signatureBase64)
  t.true(valid)
})
