import test from 'ava'
import stringToUtf8 from 'aid/convert/string/utf8'

test('empty', t => {
  const bytes = stringToUtf8('')
  t.deepEqual(bytes, new Uint8Array(0))
})

test('ascii', t => {
  const bytes = stringToUtf8('abc')
  t.deepEqual(bytes, Uint8Array.from([ 0x61, 0x62, 0x63 ]))
})

test('high char', t => {
  const string = String.fromCodePoint(9829) // '♥'
  const expectedBytes = Uint8Array.from([ 0xe2, 0x99, 0xa5 ])
  const bytes = stringToUtf8(string)
  t.deepEqual(bytes, expectedBytes)
})
