import test from 'ava'
import cryptEncodeBytes from 'aid/code/crypt/bytes/encode'

test('bytes', t => {
  const message = Uint8Array.from([ 0x05, 0x06, 0x07 ])
  const encoded = cryptEncodeBytes(message)
  t.true(encoded instanceof Uint8Array)
})

test('empty', t => {
  const message = new Uint8Array(0)
  const encoded = cryptEncodeBytes(message)
  t.deepEqual(encoded, new Uint8Array(0))
})

test('nonempty', t => {
  const message = Uint8Array.from([ 0x05, 0x06, 0x07 ])
  const expected = Uint8Array.from([
    0x42, 0x51, 0x59, 0x48 // 'BQYH' in UTF-8 without BOM
  ])
  const encoded = cryptEncodeBytes(message)
  t.deepEqual(encoded, expected)
})
