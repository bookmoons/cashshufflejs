import test from 'ava'
import Crypto from 'crypto/bitcore/main'
import generateKeyPair from 'crypto/bitcore/generate'
import exportPrivateKey from 'crypto/bitcore/exportpriv'

const keySizeBits = 256
const keySizeBytes = keySizeBits / 8 // 8 bits per byte
const keySizeChars = keySizeBytes * 2 // Byte encoded in 2 chars

test.before(t => {
  Object.assign(Crypto.prototype, {
    generateKeyPair,
    exportPrivateKey
  })
})

test('missing key pair', async t => {
  const crypto = new Crypto()
  await t.throws(async () => {
    await crypto.exportPrivateKey()
  })
})

test('string', async t => {
  const crypto = new Crypto()
  await crypto.generateKeyPair()
  const privateKey = await crypto.exportPrivateKey()
  await t.is(typeof privateKey, 'string')
})

test('length', async t => {
  const crypto = new Crypto()
  await crypto.generateKeyPair()
  const privateKey = await crypto.exportPrivateKey()
  await t.is(privateKey.length, keySizeChars)
})
