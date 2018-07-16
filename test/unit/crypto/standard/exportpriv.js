import test from 'ava'
import privs from 'crypto/standard/privs'
import Crypto from 'crypto/standard/main'
import generateKeyPair from 'crypto/standard/generate'
import exportPrivateKey from 'crypto/standard/exportpriv'

const keySizeBits = 256
const keySizeBytes = keySizeBits / 8 // 8 bits per byte
const keySizeChars = keySizeBytes * 2 // Byte encoded in 2 chars

test.before(t => {
  Object.assign(Crypto.prototype, {
    generateKeyPair,
    exportPrivateKey
  })
})

test('missing key pair', t => {
  const crypto = new Crypto()
  t.throws(() => {
    crypto.exportPrivateKey()
  })
})

test('string', t => {
  const crypto = new Crypto()
  crypto.generateKeyPair()
  const privateKey = crypto.exportPrivateKey()
  t.is(typeof privateKey, 'string')
})

test('length', t => {
  const crypto = new Crypto()
  crypto.generateKeyPair()
  const privateKey = crypto.exportPrivateKey()
  t.is(privateKey.length, keySizeChars)
})
