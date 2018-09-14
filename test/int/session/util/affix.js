import test from 'ava'
import loadProtocol from 'helper/loadprot'
import affix from 'session/util/affix'

const testSignatureString = 'Test signature'
const testSignature = Buffer.from(testSignatureString)
const testKey = 'Test key'
const testPacketObject = { fromKey: { key: testKey } }
const testSignedObject = {
  packet: testPacketObject,
  signature: { signature: testSignature }
}
let protocol

test.before(async t => {
  protocol = await loadProtocol()
})

test('affix', async t => {
  const testPacket = protocol.Packet.fromObject(testPacketObject)
  const signed = await affix(testPacket, testSignature, protocol)
  const signedObject = protocol.Signed.toObject(signed)
  t.deepEqual(signedObject, testSignedObject)
})
