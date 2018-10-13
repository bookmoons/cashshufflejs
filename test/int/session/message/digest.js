import test from 'ava'
import { Phase } from 'protocol'
import { hexToBytes } from 'aid/convert'
import loadProtocol from 'helper/loadprot'
import messageDigest from 'session/message/digest'

const sessionId = hexToBytes('1234')
const poolNumber = 100
const signingPublicKey =
  '03f09e7bbaf09669b1cde3394db0b72c3408ed0826f98d7985a3cecc1486075d3b'
const digestString = '0239480926758749870abdfefe'
const digest = hexToBytes(digestString)
const expectedHashObject = { hash: digest }
const expectedPacketObject = {
  session: sessionId,
  number: poolNumber,
  fromKey: { key: signingPublicKey },
  phase: Phase.EquivocationCheck.value,
  message: { hash: expectedHashObject }
}
let protocol

test.before(async t => {
  protocol = await loadProtocol()
})

test('construct', t => {
  const packet = messageDigest({
    protocol,
    signingPublicKey,
    sessionId,
    poolNumber,
    digest
  })
  const packetObject = protocol.Packet.toObject(packet)
  t.deepEqual(packetObject, expectedPacketObject)
})
