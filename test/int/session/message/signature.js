import test from 'ava'
import Long from 'long'
import toArrayBuffer from 'util/toarraybuffer'
import { Phase } from 'protocol'
import loadProtocol from 'helper/loadprot'
import messageSignature from 'session/message/signature'

const sessionIdString = '123'
const sessionIdBuffer = Buffer.from(sessionIdString)
const sessionId = toArrayBuffer(sessionIdBuffer)
const sessionIdView = new Uint8Array(sessionId)
const participantNumber = 4
const signingPublicKey =
  '03f09e7bbaf09669b1cde3394db0b72c3408ed0826f98d7985a3cecc1486075d3b'
const index1 = Long.fromInt(0, true)
const index2 = Long.fromInt(1, true)
const index3 = Long.fromInt(2, true)
const signature1Buffer = Buffer.from('5678', 'hex')
const signature1 = toArrayBuffer(signature1Buffer)
const signature1View = new Uint8Array(signature1)
const signature2Buffer = Buffer.from('1234', 'hex')
const signature2 = toArrayBuffer(signature2Buffer)
const signature2View = new Uint8Array(signature2)
const signature3Buffer = Buffer.from('94ab', 'hex')
const signature3 = toArrayBuffer(signature3Buffer)
const signature3View = new Uint8Array(signature3)
const signatures = new Map([
  [ index1, signature1 ],
  [ index2, signature2 ],
  [ index3, signature3 ]
])
const expectedSignaturesObject = [
  { index: index1, signature: { signature: signature1View } },
  { index: index2, signature: { signature: signature2View } },
  { index: index3, signature: { signature: signature3View } }
]
const expectedPacketObject = {
  session: sessionIdView,
  number: participantNumber,
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
    participantNumber,
    signatures
  })
  const packetObject = protocol.Packet.toObject(packet)
  t.deepEqual(packetObject, expectedPacketObject)
})
