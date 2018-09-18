import test from 'ava'
import nodeBufferToBytes from 'aid/tobytes/nodebuffer'

test('empty', t => {
  const emptyNodeBuffer = Buffer.alloc(0)
  const emptyBytes = new Uint8Array(0)
  const bytes = nodeBufferToBytes(emptyNodeBuffer)
  t.deepEqual(bytes, emptyBytes)
})

test('nonempty', t => {
  const nodeBuffer = Buffer.alloc(256)
  for (let i = 0; i <= 255; i++) nodeBuffer[i] = i
  const expectedBytes = new Uint8Array(256)
  for (let i = 0; i <= 255; i++) expectedBytes[i] = i
  const bytes = nodeBufferToBytes(nodeBuffer)
  t.deepEqual(bytes, expectedBytes)
})
