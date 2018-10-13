import test from 'ava'
import { Phase } from 'protocol'
import { hexToBytes } from 'aid/convert'
import loadProtocol from 'helper/loadprot'
import messageFinalOutput from 'session/message/finalout'

const sessionId = hexToBytes('1234')
const poolNumber = 8
const signingPublicKey =
  '03f09e7bbaf09669b1cde3394db0b72c3408ed0826f98d7985a3cecc1486075d3b'
const outputAddress = 'bitcoincash:qrqpqsvcy94qfm3a8px0sxr5lmm825u3wv3l8fd6xf'
const expectedPacketObject = {
  session: sessionId,
  number: poolNumber,
  fromKey: { key: signingPublicKey },
  phase: Phase.Broadcast.value,
  message: { str: outputAddress }
}
let protocol

test.before(async t => {
  protocol = await loadProtocol()
})

test('construct', t => {
  const packet = messageFinalOutput({
    protocol,
    signingPublicKey,
    sessionId,
    poolNumber,
    outputAddress
  })
  const packetObject = protocol.Packet.toObject(packet)
  t.deepEqual(packetObject, expectedPacketObject)
})
