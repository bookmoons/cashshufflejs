import test from 'ava'
import Crypto from 'crypto/bitcore/main'
import generateKeyPair from 'crypto/bitcore/generate'
import exportPublicKey from 'crypto/bitcore/exportpub'

// Compressed key size
const keySizeBits = 257
const keySizeBytes = Math.ceil(keySizeBits / 8) // 8 bits per byte
const keySizeChars = keySizeBytes * 2 // Byte encoded in 2 chars

test.before(t => {
  Object.assign(Crypto.prototype, {
    generateKeyPair,
    exportPublicKey
  })
})

test('missing key pair', async t => {
  const crypto = new Crypto()
  await t.throws(async () => {
    await crypto.exportPublicKey()
  })
})

test('string', async t => {
  const crypto = new Crypto()
  await crypto.generateKeyPair()
  const publicKey = await crypto.exportPublicKey()
  await t.is(typeof publicKey, 'string')
})

test('length', async t => {
  const crypto = new Crypto()
  await crypto.generateKeyPair()
  const publicKey = await crypto.exportPublicKey()
  await t.is(publicKey.length, keySizeChars)
})
