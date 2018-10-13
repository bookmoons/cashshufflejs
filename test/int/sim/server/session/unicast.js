import test from 'ava'
import { readTo } from 'promised-read'
import { terminatorByteLength, terminatorNodeBuffer } from 'protocol'
import loadProtocol from 'helper/loadprot'
import SessionServerSimulator from 'sim/server/session'

const shuffler1 = 'Shuffler 1'
const shuffler2 = 'Shuffler 2'
const number1 = 6
const number2 = 8
let protocol

const testPacketObject1 = {
  number: number1,
  toKey: { key: shuffler2 }
}
const testSignedObject1 = { packet: testPacketObject1 }
const testPacketsObject1 = { packet: [ testSignedObject1 ] }
const testPacketObject2 = {
  number: number2,
  toKey: { key: shuffler2 }
}
const testSignedObject2 = { packet: testPacketObject2 }
const testSignedPackets2 = [ testSignedObject1, testSignedObject2 ]
const testPacketsObject2 = { packet: testSignedPackets2 }

test.before(async t => {
  protocol = await loadProtocol()
})

test('1 message', async t => {
  const server = new SessionServerSimulator(protocol)
  const socket1 = await server.connect(shuffler1)
  const socket2 = await server.connect(shuffler2)
  const firstMessage =
    protocol.Packets.encode(testPacketsObject1).finish()
  const firstFrame = Buffer.concat([ firstMessage, terminatorNodeBuffer ])
  socket1.write(firstFrame)
  const secondFrame = await readTo(socket2, terminatorNodeBuffer)
  const secondLength = secondFrame.length - terminatorByteLength
  const secondMessage = secondFrame.slice(0, secondLength)
  const secondSigned = protocol.Signed.decode(secondMessage)
  const secondSignedObject = protocol.Signed.toObject(secondSigned)
  t.deepEqual(secondSignedObject, testSignedObject1)
})

test('2 messages', async t => {
  const server = new SessionServerSimulator(protocol)
  const socket1 = await server.connect(shuffler1)
  const socket2 = await server.connect(shuffler2)
  const firstMessage =
    protocol.Packets.encode(testPacketsObject2).finish()
  const firstFrame = Buffer.concat([ firstMessage, terminatorNodeBuffer ])
  socket1.write(firstFrame)
  const secondFrame1 = await readTo(socket2, terminatorNodeBuffer)
  const secondLength1 = secondFrame1.length - terminatorByteLength
  const secondMessage1 = secondFrame1.slice(0, secondLength1)
  const secondSigned1 = protocol.Signed.decode(secondMessage1)
  const secondSignedObject1 = protocol.Signed.toObject(secondSigned1)
  t.deepEqual(secondSignedObject1, testSignedObject1)
  const secondFrame2 = await readTo(socket2, terminatorNodeBuffer)
  const secondLength2 = secondFrame2.length - terminatorByteLength
  const secondMessage2 = secondFrame2.slice(0, secondLength2)
  const secondSigned2 = protocol.Signed.decode(secondMessage2)
  const secondSignedObject2 = protocol.Signed.toObject(secondSigned2)
  t.deepEqual(secondSignedObject2, testSignedObject2)
})
