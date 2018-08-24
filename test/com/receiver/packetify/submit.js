import test from 'ava'
import path from 'path'
import protobuf from 'protobufjs'
import Inbox from 'inbox/fifo'
import StoreReceiver from 'receiver/store'
import Receiver from 'receiver/packetify/main'
import submit from 'receiver/packetify/submit'

const testKey = 'Test key'
const testPacketObject = {
  fromKey: {
    key: testKey
  }
}
const testMessageObject = {
  packet: testPacketObject
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
  Object.assign(Receiver.prototype, {
    submit
  })
  protocol = await loadProtocol()
})

test('extract', async t => {
  const inbox = new Inbox()
  const storeReceiver = new StoreReceiver(inbox)
  const receiver = new Receiver(protocol, storeReceiver)
  const testMessage = protocol.Signed.fromObject(testMessageObject)
  await receiver.submit(testMessage)
  const packet = inbox.receive()
  const packetObject = protocol.Packet.toObject(packet)
  t.deepEqual(packetObject, testPacketObject)
})
