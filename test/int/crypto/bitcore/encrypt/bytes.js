import test from 'ava'
import { hexToBytes } from 'aid/convert'
import Crypto from 'crypto/bitcore/main'
import decryptBytes from 'crypto/bitcore/decrypt/bytes'
import exportPublicKey from 'crypto/bitcore/exportpub'
import generateKeyPair from 'crypto/bitcore/generate'
import encryptBytes from 'crypto/bitcore/encrypt/bytes'

const plaintext = Uint8Array.from([
  0x54, 0x65, 0x73, 0x74, 0x20, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65
])

test.before(t => {
  Object.assign(Crypto.prototype, {
    decryptBytes,
    exportPublicKey,
    generateKeyPair,
    encryptBytes
  })
})

test('encrypt', async t => {
  const senderCrypto = new Crypto()
  const recipientCrypto = new Crypto()
  await recipientCrypto.generateKeyPair()
  const recipientPublicKeyHex = await recipientCrypto.exportPublicKey()
  const recipientPublicKey = hexToBytes(recipientPublicKeyHex)
  const ciphertext = await senderCrypto.encryptBytes(
    plaintext,
    recipientPublicKey
  )
  const decryptedPlaintext = await recipientCrypto.decryptBytes(ciphertext)
  t.deepEqual(decryptedPlaintext, plaintext)
})
