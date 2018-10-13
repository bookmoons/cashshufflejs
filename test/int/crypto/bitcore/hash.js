import test from 'ava'
import { bytesToHex } from 'aid/convert'
import hash from 'crypto/bitcore/hash'

const text = 'The quick brown fox jumps over the lazy dog.'
const correctHashHex =
    '619cba8e8e05826e9b8c519c0a5c68f4fb653e8a3d8aa04bb2c8cd4c'

test('text', async t => {
  const hashBytes = await hash(text)
  const hashHex = bytesToHex(hashBytes)
  t.is(hashHex, correctHashHex)
})
