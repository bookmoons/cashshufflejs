import test from 'ava'
import toArrayBuffer from 'util/toarraybuffer'
import { Phase } from 'protocol'
import loadProtocol from 'helper/loadprot'
import { outputListDelimiter } from 'session/value'
import messageFinalOutput from 'session/message/finaloutput'

const sessionIdString = '123'
const sessionIdBuffer = Buffer.from(sessionIdString)
const sessionId = toArrayBuffer(sessionIdBuffer)
const sessionIdView = new Uint8Array(sessionId)
const participantNumber = 9
const signingPublicKey =
  '03f09e7bbaf09669b1cde3394db0b72c3408ed0826f98d7985a3cecc1486075d3b'
const output1 = 'bitcoincash:qrqpqsvcy94qfm3a8px0sxr5lmm825u3wv3l8fd6xf'
const output2 = 'bitcoincash:qqvm3zp009x5pvaclc7tf3r7h5v2k2le0qxazfnv6w'
const output3 = 'bitcoincash:qqqcrwfqh9jqpq8juwptrw384ltt2qyrcujwunn3v2'
const outputList = [ output1, output2, output3 ]
const outputListEncoded = outputList.join(outputListDelimiter)
const expectedPacketObject = {
  session: sessionIdView,
  number: participantNumber,
  fromKey: { key: signingPublicKey },
  phase: Phase.Broadcast.value,
  message: { str: outputListEncoded }
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
    participantNumber,
    outputList
  })
  const packetObject = protocol.Packet.toObject(packet)
  t.deepEqual(packetObject, expectedPacketObject)
})
