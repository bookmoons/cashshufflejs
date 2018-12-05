import test from 'ava'
import Crypto from 'crypto/bitcore/main'
import restoreKeyPair from 'crypto/bitcore/restore'
import decrypt from 'crypto/bitcore/decrypt'

const recipientPrivateKey =
  'bf7affa1c5a054114ab7be55e8fa67adce54df57918a179e098c3940a34023c2'
const ciphertext = Uint8Array.from([
  3, 71, 117, 200, 133, 192, 184, 47, 173, 65, 169, 49, 214, 143, 97, 140, 196,
  14, 167, 167, 16, 153, 208, 16, 192, 23, 245, 78, 177, 213, 20, 108, 204,
  238, 49, 231, 204, 128, 73, 132, 124, 233, 214, 152, 99, 36, 90, 226, 212,
  214, 89, 161, 21, 45, 241, 96, 234, 94, 48, 82, 45, 233, 192, 59, 157, 159,
  138, 255, 120, 121, 57, 50, 186, 244, 172, 7, 31, 246, 197, 252, 175, 110,
  100, 104, 119, 142, 26, 120, 66, 187, 31, 242, 44, 63, 83, 123, 138
])
const correctPlaintext = Uint8Array.from([
  0x54, 0x65, 0x73, 0x74, 0x20, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65
])

test.before(t => {
  Object.assign(Crypto.prototype, {
    restoreKeyPair,
    decrypt
  })
})

test('decrypt', async t => {
  const crypto = new Crypto()
  await crypto.restoreKeyPair(recipientPrivateKey)
  const plaintext = await crypto.decrypt(ciphertext)
  t.deepEqual(plaintext, correctPlaintext)
})
