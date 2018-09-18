import test from 'ava'
import copyBuffer from 'aid/buffer/copy'

test('empty', t => {
  const sourceBytes = new Uint8Array(0)
  const sourceBuffer = sourceBytes.buffer
  const buffer = copyBuffer(sourceBuffer)
  t.deepEqual(buffer, sourceBuffer)
  t.not(buffer, sourceBuffer)
})

test('1 byte', t => {
  const sourceBytes = Uint8Array.from([ 0x01 ])
  const sourceBuffer = sourceBytes.buffer
  const buffer = copyBuffer(sourceBuffer)
  t.deepEqual(buffer, sourceBuffer)
  const bytes = new Uint8Array(buffer)
  bytes[0] = 0x02
  t.not(sourceBytes[0], 0x02)
})

test('3 bytes', t => {
  const sourceBytes = Uint8Array.from([ 0x01, 0x02, 0x03 ])
  const sourceBuffer = sourceBytes.buffer
  const buffer = copyBuffer(sourceBuffer)
  t.deepEqual(buffer, sourceBuffer)
  const bytes = new Uint8Array(buffer)
  bytes[2] = 0x08
  t.not(sourceBytes[2], 0x08)
})
