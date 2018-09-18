import test from 'ava'
import Long from 'long'
import { Phase } from 'protocol'
import { hexToBytes } from 'aid/convert'
import loadProtocol from 'helper/loadprot'
import messageSignature from 'session/message/signature'

const sessionIdView = hexToBytes('1234')
const sessionId = sessionIdView.buffer
const poolNumber = 4
const signingPublicKey =
  '03f09e7bbaf09669b1cde3394db0b72c3408ed0826f98d7985a3cecc1486075d3b'
const index1 = '0'
const index1Encoded = Long.fromString(index1, true, 10)
const index2 = '1'
const index2Encoded = Long.fromString(index2, true, 10)
const index3 = '2'
const index3Encoded = Long.fromString(index3, true, 10)
const signature1String = '5676'
const signature1 = hexToBytes(signature1String)
const signature2String = '1234'
const signature2 = hexToBytes(signature2String)
const signature3String = '94ab'
const signature3 = hexToBytes(signature3String)
const signatures = new Map([
  [ index1, signature1String ],
  [ index2, signature2String ],
  [ index3, signature3String ]
])
const expectedSignaturesObject = [
  { index: index1Encoded, signature: { signature: signature1 } },
  { index: index2Encoded, signature: { signature: signature2 } },
  { index: index3Encoded, signature: { signature: signature3 } }
]
const expectedPacketObject = {
  session: sessionIdView,
  number: poolNumber,
  fromKey: { key: signingPublicKey },
  phase: Phase.VerificationSubmission.value,
  message: { signatures: expectedSignaturesObject }
}
let protocol

test.before(async t => {
  protocol = await loadProtocol()
})

test('construct', t => {
  const packet = messageSignature({
    protocol,
    signingPublicKey,
    sessionId,
    poolNumber,
    signatures
  })
  const packetObject = protocol.Packet.toObject(packet)
  t.deepEqual(packetObject, expectedPacketObject)
})
