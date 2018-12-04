import test from 'ava'
import transferDecodeKey from 'aid/code/transfer/key/decode'

test('empty', t => {
  const keyEncoded = ''
  const key = transferDecodeKey(keyEncoded)
  t.deepEqual(key, new Uint8Array(0))
})

test('nonempty', t => {
  const keyEncoded = '07da8f'
  const key = transferDecodeKey(keyEncoded)
  t.deepEqual(key, Uint8Array.from([ 0x07, 0xda, 0x8f ]))
})
