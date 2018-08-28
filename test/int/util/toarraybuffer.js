import test from 'ava'
import toArrayBuffer from 'util/toarraybuffer'

test('identical', t => {
  const buffer = Buffer.from([ 0x01, 0x02, 0x03 ])
  const binary = toArrayBuffer(buffer)
  const binaryView = new Uint8Array(binary)
  t.is(buffer[0], binaryView[0])
  t.is(buffer[1], binaryView[1])
  t.is(buffer[2], binaryView[2])
})
