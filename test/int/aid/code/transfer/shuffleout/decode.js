import test from 'ava'
import { FormatError } from 'error'
import transferDecodeShuffleOutput from 'aid/code/transfer/shuffleout/decode'

test('bad character', t => {
  const itemEncoded = 'aaa}'
  const e = t.throws(() => {
    transferDecodeShuffleOutput(itemEncoded)
  })
  t.true(e instanceof FormatError)
  t.true(e.message.startsWith('invalid base64'))
})

test('bad length', t => {
  const itemEncoded = 'ABCDEF'
  const e = t.throws(() => {
    transferDecodeShuffleOutput(itemEncoded)
  })
  t.true(e instanceof FormatError)
  t.true(e.message.startsWith('invalid base64'))
})

test('valid', t => {
  const itemEncoded = 'AQID'
  const item = transferDecodeShuffleOutput(itemEncoded)
  t.deepEqual(item, Uint8Array.from([ 1, 2, 3 ]))
})
