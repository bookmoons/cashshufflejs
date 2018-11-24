import test from 'ava'
import encodeString from 'aid/encrypt/string/encode'

test('bytes', t => {
  const bytes = encodeString('Message')
  t.true(bytes instanceof Uint8Array)
})

test('empty', t => {
  const bytes = encodeString('')
  t.deepEqual(bytes, new Uint8Array(0))
})

test('ascii', t => {
  const bytes = encodeString('abc')
  t.deepEqual(bytes, Uint8Array.from([ 0x61, 0x62, 0x63 ]))
})

test('high char', t => {
  const string = String.fromCodePoint(9829) // '♥'
  const bytes = encodeString(string)
  t.deepEqual(bytes, Uint8Array.from([ 0xe2, 0x99, 0xa5 ]))
})
