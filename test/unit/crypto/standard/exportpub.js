import test from 'ava'
import Crypto from 'crypto/standard/main'
import generateKeyPair from 'crypto/standard/generate'
import exportPublicKey from 'crypto/standard/exportpub'

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

test('missing key pair', t => {
  const crypto = new Crypto()
  t.throws(() => {
    crypto.exportPublicKey()
  })
})

test('string', t => {
  const crypto = new Crypto()
  crypto.generateKeyPair()
  const publicKey = crypto.exportPublicKey()
  t.is(typeof publicKey, 'string')
})

test('length', t => {
  const crypto = new Crypto()
  crypto.generateKeyPair()
  const publicKey = crypto.exportPublicKey()
  t.is(publicKey.length, keySizeChars)
})
