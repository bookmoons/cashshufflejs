import test from 'ava'
import cryptEncodeString from 'aid/code/crypt/string/encode'

test('bytes', t => {
  const encoded = cryptEncodeString('Message')
  t.true(encoded instanceof Uint8Array)
})

test('empty', t => {
  const encoded = cryptEncodeString('')
  t.deepEqual(encoded, new Uint8Array(0))
})

test('ascii', t => {
  const encoded = cryptEncodeString('abc')
  t.deepEqual(encoded, Uint8Array.from([ 0x61, 0x62, 0x63 ]))
})

test('high char', t => {
  const message = String.fromCodePoint(9829) // '♥'
  const encoded = cryptEncodeString(message)
  t.deepEqual(encoded, Uint8Array.from([ 0xe2, 0x99, 0xa5 ]))
})
