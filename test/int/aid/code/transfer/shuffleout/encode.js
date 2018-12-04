import test from 'ava'
import transferEncodeShuffleOutput from 'aid/code/transfer/shuffleout/encode'

test('success', t => {
  const item = Uint8Array.from([ 1, 2, 3 ])
  const itemEncoded = transferEncodeShuffleOutput(item)
  t.is(itemEncoded, 'AQID')
})
