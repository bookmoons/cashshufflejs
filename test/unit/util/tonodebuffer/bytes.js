import test from 'ava'
import bytesToNodeBuffer from 'util/tonodebuffer/bytes'

test('empty', t => {
  const emptyBytes = new Uint8Array(0)
  const emptyNodeBuffer = Buffer.alloc(0)
  const nodeBuffer = bytesToNodeBuffer(emptyBytes)
  t.deepEqual(nodeBuffer, emptyNodeBuffer)
})

test('nonempty', t => {
  const bytes = new Uint8Array(256)
  for (let i = 0; i <= 255; i++) bytes[i] = i
  const expectedNodeBuffer = Buffer.alloc(256)
  for (let i = 0; i <= 255; i++) expectedNodeBuffer[i] = i
  const nodeBuffer = bytesToNodeBuffer(bytes)
  t.deepEqual(nodeBuffer, expectedNodeBuffer)
})
