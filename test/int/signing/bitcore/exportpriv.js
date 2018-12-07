import test from 'ava'
import Signing from 'signing/bitcore/main'
import generateKeyPair from 'signing/bitcore/generate'
import exportPrivateKey from 'signing/bitcore/exportpriv'

const keySizeBits = 256
const keySizeBytes = keySizeBits / 8 // 8 bits per byte

test.before(t => {
  Object.assign(Signing.prototype, {
    generateKeyPair,
    exportPrivateKey
  })
})

test('missing key pair', async t => {
  const signing = new Signing()
  await t.throwsAsync(async () => {
    await signing.exportPrivateKey()
  })
})

test('bytes', async t => {
  const signing = new Signing()
  await signing.generateKeyPair()
  const privateKey = await signing.exportPrivateKey()
  t.true(privateKey instanceof Uint8Array)
})

test('length', async t => {
  const signing = new Signing()
  await signing.generateKeyPair()
  const privateKey = await signing.exportPrivateKey()
  t.is(privateKey.byteLength, keySizeBytes)
})
