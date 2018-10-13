import test from 'ava'
import { readTo } from 'promised-read'
import { terminatorByteLength, terminatorNodeBuffer } from 'protocol'
import loadProtocol from 'helper/loadprot'
import SessionServerSimulator from 'sim/server/session'

const shuffler1 = 'Shuffler 1'
const shuffler2 = 'Shuffler 2'
const shuffler3 = 'Shuffler 3'
const number1 = 6
const number2 = 8
let protocol

const testPacketObject1 = { number: number1 }
const testSignedObject1 = { packet: testPacketObject1 }
const testPacketsObject1 = { packet: [ testSignedObject1 ] }
const testPacketObject2 = { number: number2 }
const testSignedObject2 = { packet: testPacketObject2 }
const testSignedPackets2 = [ testSignedObject1, testSignedObject2 ]
const testPacketsObject2 = { packet: testSignedPackets2 }

test.before(async t => {
  protocol = await loadProtocol()
})

async function readSigned (protocol, socket) {
  const frame = await readTo(socket, terminatorNodeBuffer)
  const messageLength = frame.length - terminatorByteLength
  const message = frame.slice(0, messageLength)
  const signed = protocol.Signed.decode(message)
  const signedObject = protocol.Signed.toObject(signed)
  return signedObject
}

test('1 message', async t => {
  const server = new SessionServerSimulator(protocol)
  const socket1 = await server.connect(shuffler1)
  const socket2 = await server.connect(shuffler2)
  const socket3 = await server.connect(shuffler3)
  const firstMessage =
    protocol.Packets.encode(testPacketsObject1).finish()
  const firstFrame = Buffer.concat([ firstMessage, terminatorNodeBuffer ])
  socket1.write(firstFrame)
  const secondSignedObject = await readSigned(protocol, socket2)
  t.deepEqual(secondSignedObject, testSignedObject1)
  const thirdSignedObject = await readSigned(protocol, socket3)
  t.deepEqual(thirdSignedObject, testSignedObject1)
})

test('2 messages', async t => {
  const server = new SessionServerSimulator(protocol)
  const socket1 = await server.connect(shuffler1)
  const socket2 = await server.connect(shuffler2)
  const socket3 = await server.connect(shuffler3)
  const firstMessage =
    protocol.Packets.encode(testPacketsObject2).finish()
  const firstFrame = Buffer.concat([ firstMessage, terminatorNodeBuffer ])
  socket1.write(firstFrame)
  const secondSignedObject1 = await readSigned(protocol, socket2)
  t.deepEqual(secondSignedObject1, testSignedObject1)
  const secondSignedObject2 = await readSigned(protocol, socket2)
  t.deepEqual(secondSignedObject2, testSignedObject2)
  const thirdSignedObject1 = await readSigned(protocol, socket3)
  t.deepEqual(thirdSignedObject1, testSignedObject1)
  const thirdSignedObject2 = await readSigned(protocol, socket3)
  t.deepEqual(thirdSignedObject2, testSignedObject2)
})
