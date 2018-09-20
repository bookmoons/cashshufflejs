import test from 'ava'
import Crypto from 'crypto/bitcore/main'
import decryptBytes from 'crypto/bitcore/decrypt/bytes'
import decryptString from 'crypto/bitcore/decrypt/string'
import encryptString from 'crypto/bitcore/encrypt/string'
import exportPublicKey from 'crypto/bitcore/exportpub'
import generateKeyPair from 'crypto/bitcore/generate'

const message = 'Test message'

test.before(t => {
  Object.assign(Crypto.prototype, {
    decryptBytes,
    decryptString,
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
  const cryptogram = await senderCrypto.encryptString(
    message,
    recipientPublicKey
  )
  const decryptedMessage = await recipientCrypto.decryptString(cryptogram)
  t.is(decryptedMessage, message)
})
