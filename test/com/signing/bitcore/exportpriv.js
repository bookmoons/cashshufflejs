import test from 'ava'
import Signing from 'signing/bitcore/main'
import generateKeyPair from 'signing/bitcore/generate'
import exportPrivateKey from 'signing/bitcore/exportpriv'

const keySizeBits = 256
const keySizeBytes = keySizeBits / 8 // 8 bits per byte
const keySizeChars = keySizeBytes * 2 // Byte encoded in 2 chars

test.before(t => {
  Object.assign(Signing.prototype, {
    generateKeyPair,
    exportPrivateKey
  })
})

test('missing key pair', async t => {
  const signing = new Signing()
  await t.throws(async () => {
    await signing.exportPrivateKey()
  })
})

test('string', async t => {
  const signing = new Signing()
  await signing.generateKeyPair()
  const privateKey = await signing.exportPrivateKey()
  await t.is(typeof privateKey, 'string')
})

test('length', async t => {
  const signing = new Signing()
  await signing.generateKeyPair()
  const privateKey = await signing.exportPrivateKey()
  await t.is(privateKey.length, keySizeChars)
})
