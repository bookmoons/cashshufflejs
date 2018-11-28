import test from 'ava'
import cryptDecodeBytes from 'aid/code/crypt/bytes/decode'

test('bytes', t => {
  const encoded = Uint8Array.from([ 0x42, 0x51, 0x59, 0x48 ])
  const message = cryptDecodeBytes(encoded)
  t.true(message instanceof Uint8Array)
})

test('empty', t => {
  const encoded = new Uint8Array(0)
  const message = cryptDecodeBytes(encoded)
  t.deepEqual(message, new Uint8Array(0))
})

test('nonempty', t => {
  const encoded = Uint8Array.from([ 0x42, 0x51, 0x59, 0x48 ])
  const expected = Uint8Array.from([ 0x05, 0x06, 0x07 ])
  const message = cryptDecodeBytes(encoded)
  t.deepEqual(message, expected)
})
