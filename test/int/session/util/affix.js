import test from 'ava'
import loadProtocol from 'helper/loadprot'
import affix from 'session/util/affix'

const testSignature = Uint8Array.from([ 0x61, 0x62, 0x63 ])
const testSignatureBase64 = 'YWJj'
const testSignatureEncoded = Uint8Array.from([ 0x59, 0x57, 0x4a, 0x6a ])
const testKey = 'Test key'
const testPacketObject = { fromKey: { key: testKey } }
const testSignedObject = {
  packet: testPacketObject,
  signature: { signature: testSignatureEncoded }
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
