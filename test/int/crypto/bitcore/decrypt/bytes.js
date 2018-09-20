import test from 'ava'
import Crypto from 'crypto/bitcore/main'
import restoreKeyPair from 'crypto/bitcore/restore'
import decryptBytes from 'crypto/bitcore/decrypt/bytes'

const recipientPrivateKey =
  'bf7affa1c5a054114ab7be55e8fa67adce54df57918a179e098c3940a34023c2'
const ciphertext =
  'A0d1yIXAuC+tQakx1o9hjMQOp6cQmdAQwBf1TrHVFGzM7jHnzIBJhHzp1phjJFri1N' +
  'ZZoRUt8WDqXjBSLenAO52fiv94eTkyuvSsBx/2xfyvbmRod44aeEK7H/IsP1N7ig=='
const correctBytes = Uint8Array.from([
  0x54, 0x65, 0x73, 0x74, 0x20, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65
])

test.before(t => {
  Object.assign(Crypto.prototype, {
    restoreKeyPair,
    decryptBytes
  })
})

test('decrypt', async t => {
  const crypto = new Crypto()
  await crypto.restoreKeyPair(recipientPrivateKey)
  const bytes = await crypto.decryptBytes(ciphertext)
  t.deepEqual(bytes, correctBytes)
})
