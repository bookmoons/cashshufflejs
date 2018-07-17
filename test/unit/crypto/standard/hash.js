import test from 'ava'
import arrayBufferToHex from 'array-buffer-to-hex'
import hash from 'crypto/standard/hash'

const text = 'The quick brown fox jumps over the lazy dog.'
const correctHashHex =
    '619cba8e8e05826e9b8c519c0a5c68f4fb653e8a3d8aa04bb2c8cd4c'

test('text', async t => {
  const textHash = await hash(text)
  const textHashHex = arrayBufferToHex(textHash)
  await t.true(textHashHex === correctHashHex)
  await t.pass()
})
