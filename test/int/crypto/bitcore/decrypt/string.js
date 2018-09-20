import test from 'ava'
import Crypto from 'crypto/bitcore/main'
import decryptBytes from 'crypto/bitcore/decrypt/bytes'
import decryptString from 'crypto/bitcore/decrypt/string'
import restoreKeyPair from 'crypto/bitcore/restore'

const recipientPrivateKey =
  'bf7affa1c5a054114ab7be55e8fa67adce54df57918a179e098c3940a34023c2'
const ciphertext =
  'A0d1yIXAuC+tQakx1o9hjMQOp6cQmdAQwBf1TrHVFGzM7jHnzIBJhHzp1phjJFri1N' +
  'ZZoRUt8WDqXjBSLenAO52fiv94eTkyuvSsBx/2xfyvbmRod44aeEK7H/IsP1N7ig=='
const correctPlaintext = 'Test message'

test.before(t => {
  Object.assign(Crypto.prototype, {
    decryptBytes,
    decryptString,
    restoreKeyPair
  })
})

test('decrypt', async t => {
  const crypto = new Crypto()
  await crypto.restoreKeyPair(recipientPrivateKey)
  const plaintext = await crypto.decryptString(ciphertext)
  await t.is(plaintext, correctPlaintext)
})
