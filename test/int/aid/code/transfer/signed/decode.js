import test from 'ava'
import loadProtocol from 'helper/loadprot'
import transferDecodeSigned from 'aid/code/transfer/signed/decode'
let protocol

test.before(async t => {
  protocol = await loadProtocol()
})

test('empty', t => {
  const signed = protocol.Signed.create({})
  const signedEncoded = protocol.Signed.encode(signed).finish()
  const signedDecoded = transferDecodeSigned(protocol, signedEncoded)
  t.deepEqual(signedDecoded, signed)
})

test('nonempty', t => {
  const signedObject = {
    packet: { number: 8 }
  }
  const signed = protocol.Signed.fromObject(signedObject)
  const signedEncoded = protocol.Signed.encode(signed).finish()
  const signedDecoded = transferDecodeSigned(protocol, signedEncoded)
  t.deepEqual(signedDecoded, signed)
})
