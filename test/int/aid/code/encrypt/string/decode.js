import test from 'ava'
import cryptDecodeString from 'aid/encrypt/string/decode'

test('string', t => {
  const string = cryptDecodeString(Uint8Array.from([ 0x61 ]))
  t.is(typeof string, 'string')
})

test('empty', t => {
  const string = cryptDecodeString(new Uint8Array(0))
  t.is(string, '')
})

test('ascii', t => {
  const string = cryptDecodeString(Uint8Array.from([ 0x61, 0x62, 0x63 ]))
  t.is(string, 'abc')
})

test('high char', t => {
  const expectedString = String.fromCodePoint(9829) // '♥'
  const string = cryptDecodeString(Uint8Array.from([ 0xe2, 0x99, 0xa5 ]))
  t.is(string, expectedString)
})
