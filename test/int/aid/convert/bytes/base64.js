import test from 'ava'
import bytesToBase64 from 'aid/convert/bytes/base64'

test('success', t => {
  const bytes = Uint8Array.from([ 1, 2, 3 ])
  const expectedBase64 = 'AQID'
  const base64 = bytesToBase64(bytes)
  t.is(base64, expectedBase64)
})
