import test from 'ava'
import hexToBytes from 'aid/tobytes/hex'
import { Phase } from 'protocol'
import loadProtocol from 'helper/loadprot'
import messageAnnounce from 'session/message/announce'

const sessionIdView = hexToBytes('1234')
const sessionId = sessionIdView.buffer
const poolNumber = 3
const signingPublicKey =
  '02fb043436476ebd0391350016a6003f9e02f97e96a9ece386aac2d2060158b377'
const encryptionPublicKey =
  '0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798'
const expectedPacketObject = {
  session: sessionIdView,
  number: poolNumber,
  fromKey: { key: signingPublicKey },
  phase: Phase.Announcement.value,
  message: {
    key: { key: encryptionPublicKey }
  }
}
let protocol

test.before(async t => {
  protocol = await loadProtocol()
})

test('construct', t => {
  const packet = messageAnnounce({
    protocol,
    signingPublicKey,
    sessionId,
    poolNumber,
    encryptionPublicKey
  })
  const packetObject = protocol.Packet.toObject(packet)
  t.deepEqual(packetObject, expectedPacketObject)
})
