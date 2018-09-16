import test from 'ava'
import bufferToBytes from 'util/tobytes/buffer'

const testBufferEmpty = Buffer.alloc(0)
const expectedBytesEmpty = new Uint8Array(0)
const testBuffer = Buffer.from([ 0x01, 0x02, 0x03 ])
const expectedBytes = Uint8Array.from([ 0x01, 0x02, 0x03 ])

test('empty', t => {
  const bytes = bufferToBytes(testBufferEmpty)
  t.deepEqual(bytes, expectedBytesEmpty)
})

test('nonempty', t => {
  const bytes = bufferToBytes(testBuffer)
  t.deepEqual(bytes, expectedBytes)
})
