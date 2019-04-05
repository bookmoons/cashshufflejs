import test from 'ava'
import { Phase } from 'protocol'
import { hexToBytes } from 'aid/convert'
import loadProtocol from 'helper/loadprot'
import messageAnnounce from 'session/message/announce'

const sessionId = hexToBytes('1234')
const poolNumber = 3
const signingPublicKeyHex =
  '02fb043436476ebd0391350016a6003f9e02f97e96a9ece386aac2d2060158b377'
const signingPublicKey = hexToBytes(signingPublicKeyHex)
const encryptionPublicKeyHex =
  '0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798'
const encryptionPublicKey = hexToBytes(encryptionPublicKeyHex)
const expectedPacketObject = {
  session: sessionId,
  number: poolNumber,
  fromKey: { key: signingPublicKeyHex },
  phase: Phase.Announcement.value,
  message: {
    key: { key: encryptionPublicKeyHex }
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
