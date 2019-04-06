import test from 'ava'
import { hexToBytes } from 'aid/convert'
import Signing from 'signing/bitcore/main'
import restoreKeyPair from 'signing/bitcore/restore'
import address from 'signing/bitcore/address'

const testPrivateKeyHex =
  '78100d2fe6681f3063eefff3b5a5e02a11a90600cd13153c304641c40c53e444'
const testPrivateKey = hexToBytes(testPrivateKeyHex)
const expectedAddress =
  'bitcoincash:qzcyfu3a5r50cctsppnlh8kmjwe20xxx2vvqvgzgas'

test.before(t => {
  Object.assign(Signing.prototype, {
    restoreKeyPair,
    address
  })
})

test('missing key pair', async t => {
  const signing = new Signing()
  await t.throwsAsync(async () => {
    await signing.address()
  })
})

test('success', async t => {
  const signing = new Signing()
  await signing.restoreKeyPair(testPrivateKey)
  const address = await signing.address()
  t.is(address, expectedAddress)
})
