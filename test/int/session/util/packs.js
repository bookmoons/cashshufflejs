import test from 'ava'
import { hexToBytes } from 'aid/convert'
import loadProtocol from 'helper/loadprot'
import Signing from 'signing/bitcore'
import packageSignedPackets from 'session/util/packs'

const signingPrivateKeyHex =
  'ad6110ba1413c6b9f4f1538c86fd5809e8a7e638905a75c95ade5d02afb54931'
const signingPrivateKey = hexToBytes(signingPrivateKeyHex)
const testKey = 'Test key'
const testMessage1 = 'Test message 1'
const testMessage2 = 'Test message 2'
const testMessage3 = 'Test message 3'
const testPacketObject1 = {
  fromKey: { key: testKey },
  message: { str: testMessage1 }
}
const testSignedObject1 = { packet: testPacketObject1 }
const testPacketObject2 = {
  fromKey: { key: testKey },
  message: { str: testMessage2 }
}
const testSignedObject2 = { packet: testPacketObject2 }
const testPacketObject3 = {
  fromKey: { key: testKey },
  message: { str: testMessage3 }
}
const testSignedObject3 = { packet: testPacketObject3 }
const testSignedObjects = [
  testSignedObject1,
  testSignedObject2,
  testSignedObject3
]
const expectedPacketsObject = { packet: testSignedObjects }
let protocol

test.before(async t => {
  protocol = await loadProtocol()
})

test('package', async t => {
  const signing = new Signing()
  await signing.restoreKeyPair(signingPrivateKey)
  const testSignedInstances = []
  for (const testSignedObject of testSignedObjects) {
    const testSigned = protocol.Signed.fromObject(testSignedObject)
    testSignedInstances.push(testSigned)
  }
  const packets = await packageSignedPackets(protocol, testSignedInstances)
  const packetsObject = protocol.Packets.toObject(packets)
  t.deepEqual(packetsObject, expectedPacketsObject)
})
