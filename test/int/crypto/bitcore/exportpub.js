import test from 'ava'
import Crypto from 'crypto/bitcore/main'
import generateKeyPair from 'crypto/bitcore/generate'
import exportPublicKey from 'crypto/bitcore/exportpub'

// Compressed key size
const keySizeBits = 257
const keySizeBytes = Math.ceil(keySizeBits / 8) // 8 bits per byte

test.before(t => {
  Object.assign(Crypto.prototype, {
    generateKeyPair,
    exportPublicKey
  })
})

test('missing key pair', async t => {
  const crypto = new Crypto()
  await t.throwsAsync(async () => {
    await crypto.exportPublicKey()
  })
})

test('bytes', async t => {
  const crypto = new Crypto()
  await crypto.generateKeyPair()
  const publicKey = await crypto.exportPublicKey()
  t.true(publicKey instanceof Uint8Array)
})

test('length', async t => {
  const crypto = new Crypto()
  await crypto.generateKeyPair()
  const publicKey = await crypto.exportPublicKey()
  t.is(publicKey.byteLength, keySizeBytes)
})
