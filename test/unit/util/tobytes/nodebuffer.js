import test from 'ava'
import nodeBufferToBytes from 'util/tobytes/nodebuffer'

test('empty', t => {
  const emptyNodeBuffer = Buffer.alloc(0)
  const emptyBytes = new Uint8Array(0)
  const bytes = nodeBufferToBytes(emptyNodeBuffer)
  t.deepEqual(bytes, emptyBytes)
})

test('nonempty', t => {
  const testNodeBuffer = Buffer.from([ 0x01, 0x02, 0x03 ])
  const expectedBytes = Uint8Array.from([ 0x01, 0x02, 0x03 ])
  const bytes = nodeBufferToBytes(testNodeBuffer)
  t.deepEqual(bytes, expectedBytes)
})
