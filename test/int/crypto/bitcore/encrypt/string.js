import test from 'ava'
import Crypto from 'crypto/bitcore/main'
import decryptBytes from 'crypto/bitcore/decrypt/bytes'
import decryptString from 'crypto/bitcore/decrypt/string'
import encryptBytes from 'crypto/bitcore/encrypt/bytes'
import encryptString from 'crypto/bitcore/encrypt/string'
import exportPublicKey from 'crypto/bitcore/exportpub'
import generateKeyPair from 'crypto/bitcore/generate'

const plaintext = 'Test message'

test.before(t => {
  Object.assign(Crypto.prototype, {
    decryptBytes,
    decryptString,
    encryptBytes,
    encryptString,
    exportPublicKey,
    generateKeyPair
  })
})

test('encrypt', async t => {
  const senderCrypto = new Crypto()
  const recipientCrypto = new Crypto()
  await recipientCrypto.generateKeyPair()
  const recipientPublicKey = await recipientCrypto.exportPublicKey()
  const ciphertext = await senderCrypto.encryptString(
    plaintext,
    recipientPublicKey
  )
  const decryptedPlaintext = await recipientCrypto.decryptString(ciphertext)
  t.is(decryptedPlaintext, plaintext)
})
