import test from 'ava'
import bufferToBytes from 'aid/convert/buffer/bytes'

test('success', t => {
  const buffer = Uint8Array.from([ 0x08, 0x09, 0x0a ]).buffer
  const expectedBytes = Uint8Array.from([ 0x08, 0x09, 0x0a ])
  const bytes = bufferToBytes(buffer)
  t.deepEqual(bytes, expectedBytes)
})
