import test from 'ava'
import utf8ToString from 'aid/convert/utf8/string'

test('empty', t => {
  const string = utf8ToString(new Uint8Array(0))
  t.is(string, '')
})

test('ascii', t => {
  const bytes = Uint8Array.from([ 0x61, 0x62, 0x63 ])
  const expectedString = 'abc'
  const string = utf8ToString(bytes)
  t.is(string, expectedString)
})

test('high char', t => {
  const bytes = Uint8Array.from([ 0xe2, 0x99, 0xa5 ])
  const expectedString = String.fromCodePoint(9829) // '♥'
  const string = utf8ToString(bytes)
  t.is(string, expectedString)
})
