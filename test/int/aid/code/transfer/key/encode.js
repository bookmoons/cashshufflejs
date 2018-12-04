import test from 'ava'
import transferEncodeKey from 'aid/code/transfer/key/encode'

test('empty', t => {
  const key = new Uint8Array(0)
  const keyEncoded = transferEncodeKey(key)
  t.is(keyEncoded, '')
})

test('nonempty', t => {
  const key = Uint8Array.from([ 0x07, 0xda, 0x8f ])
  const keyEncoded = transferEncodeKey(key)
  t.is(keyEncoded.toLowerCase(), '07da8f')
})
