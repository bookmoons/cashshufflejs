import test from 'ava'
import Crypto from 'crypto/bitcore/main'
import generateKeyPair from 'crypto/bitcore/generate'
import exportPrivateKey from 'crypto/bitcore/exportpriv'

const keySizeBits = 256
const keySizeBytes = keySizeBits / 8 // 8 bits per byte

test.before(t => {
  Object.assign(Crypto.prototype, {
    generateKeyPair,
    exportPrivateKey
  })
})

test('missing key pair', async t => {
  const crypto = new Crypto()
  await t.throwsAsync(async () => {
    await crypto.exportPrivateKey()
  })
})

test('bytes', async t => {
  const crypto = new Crypto()
  await crypto.generateKeyPair()
  const privateKey = await crypto.exportPrivateKey()
  t.true(privateKey instanceof Uint8Array)
})

test('length', async t => {
  const crypto = new Crypto()
  await crypto.generateKeyPair()
  const privateKey = await crypto.exportPrivateKey()
  t.is(privateKey.byteLength, keySizeBytes)
})
