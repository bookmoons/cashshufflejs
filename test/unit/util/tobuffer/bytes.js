import test from 'ava'
import bytesToBuffer from 'util/tobuffer/bytes'

test('complete view', t => {
  const bytes = Uint8Array.from([ 0x08, 0x09, 0x0a ])
  const expectedBuffer = Uint8Array.from([ 0x08, 0x09, 0x0a ]).buffer
  const buffer = bytesToBuffer(bytes)
  t.deepEqual(buffer, expectedBuffer)
})

test('partial view', t => {
  const backingBuffer = Uint8Array.from([ 0x08, 0x09, 0x0a ]).buffer
  const bytes = new Uint8Array(backingBuffer, 1)
  const expectedBuffer = Uint8Array.from([ 0x09, 0x0a ]).buffer
  const buffer = bytesToBuffer(bytes)
  t.deepEqual(buffer, expectedBuffer)
})
