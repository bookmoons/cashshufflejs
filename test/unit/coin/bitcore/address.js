import test from 'ava'
import Coin from 'coin/bitcore/main'
import address from 'coin/bitcore/address'

const publicKeyString =
  '0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798'
const expectedAddress =
  'bitcoincash:qp63uahgrxged4z5jswyt5dn5v3lzsem6cy4spdc2h'

test.before(t => {
  Object.assign(Coin.prototype, {
    address
  })
})

test('correct', async t => {
  const coin = new Coin()
  const producedAddress = await coin.address(publicKeyString)
  t.is(producedAddress, expectedAddress)
})
