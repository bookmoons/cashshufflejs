import test from 'ava'
import Signing from 'signing/bitcore/main'
import generateKeyPair from 'signing/bitcore/generate'
import exportPublicKey from 'signing/bitcore/exportpub'

// Compressed key size
const keySizeBits = 257
const keySizeBytes = Math.ceil(keySizeBits / 8) // 8 bits per byte

test.before(t => {
  Object.assign(Signing.prototype, {
    generateKeyPair,
    exportPublicKey
  })
})

test('missing key pair', async t => {
  const signing = new Signing()
  await t.throwsAsync(async () => {
    await signing.exportPublicKey()
  })
})

test('bytes', async t => {
  const signing = new Signing()
  await signing.generateKeyPair()
  const publicKey = await signing.exportPublicKey()
  await t.true(publicKey instanceof Uint8Array)
})

test('length', async t => {
  const signing = new Signing()
  await signing.generateKeyPair()
  const publicKey = await signing.exportPublicKey()
  t.is(publicKey.byteLength, keySizeBytes)
})
