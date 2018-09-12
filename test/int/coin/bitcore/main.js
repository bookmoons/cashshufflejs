import test from 'ava'
import Coin from 'coin/base'
import BitcoreCoin from 'coin/bitcore'

test('subclass', t => {
  const coin = new BitcoreCoin()
  t.true(coin instanceof Coin)
})
