import test from 'ava'
import loadProtocol from 'helper/loadprot'
import Signing from 'signing/bitcore'
import packageSignedPacket from 'session/package'

const signingPrivateKey =
  'ad6110ba1413c6b9f4f1538c86fd5809e8a7e638905a75c95ade5d02afb54931'
const testKey = 'Test key'
const testPacketObject = { fromKey: { key: testKey } }
const testSignedObject = { packet: testPacketObject }
const expectedPacketsObject = { packet: [ testSignedObject ] }
let protocol

test.before(async t => {
  protocol = await loadProtocol()
})

test('package', async t => {
  const signing = new Signing()
  await signing.restoreKeyPair(signingPrivateKey)
  const testSigned = protocol.Signed.fromObject(testSignedObject)
  const packets = await packageSignedPacket(protocol, testSigned)
  const packetsObject = protocol.Packets.toObject(packets)
  t.deepEqual(packetsObject, expectedPacketsObject)
})
