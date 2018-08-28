import test from 'ava'
import Coin from 'coin/bitcore/main'
import verifySignature from 'coin/bitcore/verify'

const publicKeyString =
  '0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798'
const message = 'Test message'
const invalidSignature =
  'IE5lvDJ6c1hrI2A3tuQn5XYZlvJyW2KidVdzTb6mhh2ADlG2z1aNqdqN4fJStoqVFt' +
  'AReIqspfBYs74MuRmCwt0='
const validSignature =
  'IIa6pw7yT1TP1rEBAS0NiTmM8TMNKkeCLOUyil3JdfqHeL/0A8xUX0JhRj9hkfvtJK' +
  'EwUhqGl55osRV4Lu+b0ik='

test.before(t => {
  Object.assign(Coin.prototype, {
    verifySignature
  })
})

test('invalid', async t => {
  const coin = new Coin()
  const valid = await coin.verifySignature(
    invalidSignature,
    message,
    publicKeyString
  )
  t.false(valid)
})

test('valid', async t => {
  const coin = new Coin()
  const valid = await coin.verifySignature(
    validSignature,
    message,
    publicKeyString
  )
  t.true(valid)
})
