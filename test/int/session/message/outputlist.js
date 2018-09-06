import test from 'ava'
import toArrayBuffer from 'util/toarraybuffer'
import { Phase } from 'protocol'
import loadProtocol from 'helper/loadprot'
import { outputListDelimiter } from 'session/value'
import messageOutputList from 'session/message/outputlist'

const sessionIdString = '123'
const sessionIdBuffer = Buffer.from(sessionIdString)
const sessionId = toArrayBuffer(sessionIdBuffer)
const sessionIdView = new Uint8Array(sessionId)
const participantNumber = 7
const signingPublicKey =
  '03f09e7bbaf09669b1cde3394db0b72c3408ed0826f98d7985a3cecc1486075d3b'
const nextParticipant =
  '023fd1952670be6e23cd120d3441ef696976a805147a8e034eb779e2d8b22102b9'
const output1 =
  'A/Cee7rwlmmxzeM5TbC3LDQI7Qgm+Y15haPOzBSGB1071Zs6T8FR5uuJCTBrBJnGxqv4' +
  'ii6cXLpkVyrcKsK+epO9J6F9V0qkt1Ic0OR32Be5W2ddGr13HQIFS+RltmeACikqq120' +
  'b7GRgFTnvTTuZs8AVKH/AqCvqt5NqT1fiIqW+TEuzvLAd0Y5ABWkG50HIA=='
const output2 =
  'A/Cee7rwlmmxzeM5TbC3LDQI7Qgm+Y15haPOzBSGB107Z9OOF3YyMTsWxBtMOA2Z8OJ+' +
  'EGaJuaoyTQEH8VTwy3ZXvBNbDGY9FTBEpexYbOleNW1dUl6mVkTXOVd9Inf2Vdy3HD4L' +
  'SirOU6qgW01YiBRx6lO3raZrP+mQxTiceI1YehOw56r1rgT6ELISZzpRtQ=='
const output3 =
  'A/Cee7rwlmmxzeM5TbC3LDQI7Qgm+Y15haPOzBSGB107BjuQFdYqp/UyxdPXj/QodR30' +
  'vfU9ZmNaSnmArDetI+n4RLoIYro5IJ53VqEvBjFgjgaAUOTICl2I/iecVrnxkkAVYHnG' +
  'UvPIwKZ2BpfWElKOD7fbBUAo8Bq9mdslv2ckDcTmntKKfPbsNy4TqfMR8g=='
const outputList = [ output1, output2, output3 ]
const outputListEncoded = outputList.join(outputListDelimiter)
const expectedPacketObject = {
  session: sessionIdView,
  number: participantNumber,
  fromKey: { key: signingPublicKey },
  toKey: { key: nextParticipant },
  phase: Phase.Shuffle.value,
  message: { str: outputListEncoded }
}
let protocol

test.before(async t => {
  protocol = await loadProtocol()
})

test('construct', t => {
  const packet = messageOutputList({
    protocol,
    signingPublicKey,
    sessionId,
    participantNumber,
    outputList,
    nextParticipant
  })
  const packetObject = protocol.Packet.toObject(packet)
  t.deepEqual(packetObject, expectedPacketObject)
})
