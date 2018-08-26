import test from 'ava'
import path from 'path'
import protobuf from 'protobufjs'
import toArrayBuffer from 'util/toarraybuffer'
import messageAnnounce from 'session/message/announce'

const sessionIdString = '123'
const sessionIdBuffer = Buffer.from(sessionIdString)
const sessionId = toArrayBuffer(sessionIdBuffer)
const sessionIdView = new Uint8Array(sessionId)
const publicKey =
  '0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798'
const phaseIdentifier = 1
const expectedPacketObject = {
  session: sessionIdView,
  phase: phaseIdentifier,
  message: {
    key: {
      key: publicKey
    }
  }
}
let protocol

async function loadProtocol () {
  const definitionPath = path.join(
    __dirname,
    '..', '..', '..', '..',
    'src',
    'protocol',
    'cashshuffle.proto'
  )
  const protocol = await protobuf.load(definitionPath)
  return protocol
}

test.before(async t => {
  protocol = await loadProtocol()
})

test('construct', t => {
  const packet = messageAnnounce(protocol, sessionId, publicKey)
  const packetObject = protocol.Packet.toObject(packet)
  t.deepEqual(packetObject, expectedPacketObject)
})
