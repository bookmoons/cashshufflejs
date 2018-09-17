import test from 'ava'
import nodeBufferToBytes from 'util/tobytes/nodebuffer'

const testBufferEmpty = Buffer.alloc(0)
const expectedBytesEmpty = new Uint8Array(0)
const testBuffer = Buffer.from([ 0x01, 0x02, 0x03 ])
const expectedBytes = Uint8Array.from([ 0x01, 0x02, 0x03 ])

test('empty', t => {
  const bytes = nodeBufferToBytes(testBufferEmpty)
  t.deepEqual(bytes, expectedBytesEmpty)
})

test('nonempty', t => {
  const bytes = nodeBufferToBytes(testBuffer)
  t.deepEqual(bytes, expectedBytes)
})
