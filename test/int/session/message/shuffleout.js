import test from 'ava'
import { Phase } from 'protocol'
import { base64ToBytes, hexToBytes } from 'aid/convert'
import loadProtocol from 'helper/loadprot'
import messageShuffleOutput from 'session/message/shuffleout'

const sessionId = hexToBytes('1234')
const poolNumber = 4
const signingPublicKey =
  '03f09e7bbaf09669b1cde3394db0b72c3408ed0826f98d7985a3cecc1486075d3b'
const nextShuffler =
  '023fd1952670be6e23cd120d3441ef696976a805147a8e034eb779e2d8b22102b9'
const outputBase64 =
  'A/Cee7rwlmmxzeM5TbC3LDQI7Qgm+Y15haPOzBSGB1071Zs6T8FR5uuJCTBrBJnGxqv4' +
  'ii6cXLpkVyrcKsK+epO9J6F9V0qkt1Ic0OR32Be5W2ddGr13HQIFS+RltmeACikqq120' +
  'b7GRgFTnvTTuZs8AVKH/AqCvqt5NqT1fiIqW+TEuzvLAd0Y5ABWkG50HIA=='
const output = base64ToBytes(outputBase64)
const expectedPacketObject = {
  session: sessionId,
  number: poolNumber,
  fromKey: { key: signingPublicKey },
  toKey: { key: nextShuffler },
  phase: Phase.Shuffle.value,
  message: { str: outputBase64 }
}
let protocol

test.before(async t => {
  protocol = await loadProtocol()
})

test('construct', t => {
  const packet = messageShuffleOutput({
    protocol,
    signingPublicKey,
    sessionId,
    poolNumber,
    output,
    nextShuffler
  })
  const packetObject = protocol.Packet.toObject(packet)
  t.deepEqual(packetObject, expectedPacketObject)
})
