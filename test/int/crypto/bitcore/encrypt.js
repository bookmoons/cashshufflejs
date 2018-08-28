import test from 'ava'
import Crypto from 'crypto/bitcore/main'
import decrypt from 'crypto/bitcore/decrypt'
import encrypt from 'crypto/bitcore/encrypt'
import exportPublicKey from 'crypto/bitcore/exportpub'
import generateKeyPair from 'crypto/bitcore/generate'

const message = 'Test message'

test.before(t => {
  Object.assign(Crypto.prototype, {
    decrypt,
    encrypt,
    exportPublicKey,
    generateKeyPair
  })
})

test('encrypt', async t => {
  const senderCrypto = new Crypto()
  const recipientCrypto = new Crypto()
  await recipientCrypto.generateKeyPair()
  const recipientPublicKey = await recipientCrypto.exportPublicKey()
  const cryptogram = await senderCrypto.encrypt(
    message,
    recipientPublicKey
  )
  const decryptedMessage = await recipientCrypto.decrypt(cryptogram)
  t.is(decryptedMessage, message)
})
