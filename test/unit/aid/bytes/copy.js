import test from 'ava'
import copyBytes from 'aid/bytes/copy'

test('empty', t => {
  const sourceBytes = new Uint8Array(0)
  const bytes = copyBytes(sourceBytes)
  t.deepEqual(bytes, sourceBytes)
  t.not(bytes, sourceBytes)
})

test('1 byte', t => {
  const sourceBytes = Uint8Array.from([ 0x01 ])
  const bytes = copyBytes(sourceBytes)
  t.deepEqual(bytes, sourceBytes)
  bytes[0] = 0x02
  t.not(sourceBytes[0], 0x02)
})

test('3 bytes', t => {
  const sourceBytes = Uint8Array.from([ 0x01, 0x02, 0x03 ])
  const bytes = copyBytes(sourceBytes)
  t.deepEqual(bytes, sourceBytes)
  bytes[2] = 0x08
  t.not(sourceBytes[2], 0x08)
})
