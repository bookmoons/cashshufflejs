import test from 'ava'
import { hexToBytes } from 'aid/convert'
import Coin from 'coin/bitcore/main'
import verifySignature from 'coin/bitcore/verify'

const publicKeyString =
  '0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798'
const message = 'Test message'
const invalidSignatureHex =
  '204e65bc327a73586b236037b6e427e5761996f2725b62a27557734dbea6861d800e51' +
  'b6cf568da9da8de1f252b68a9516d011788aaca5f058b3be0cb91982c2dd'
const invalidSignature = hexToBytes(invalidSignatureHex)
const validSignatureHex =
  '2086baa70ef24f54cfd6b101012d0d89398cf1330d2a47822ce5328a5dc975fa8778bf' +
  'f403cc545f4261463f6191fbed24a130521a86979e68b115782eef9bd229'
const validSignature = hexToBytes(validSignatureHex)

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
