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
const testValidMessageObject = {
  packet: testPacketObject
}
const testInvalidMessageObject = {}
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

test('invalid', async t => {
  const discarderInbox = new Inbox()
  const discarder = new StoreReceiver(discarderInbox)
  const inbox = new Inbox()
  const storeReceiver = new StoreReceiver(inbox)
  const receiver = new Receiver(protocol, storeReceiver, discarder)
  const testMessage = protocol.Signed.fromObject(testInvalidMessageObject)
  await receiver.submit(testMessage)
  t.notThrows(() => { // Message discarded
    discarderInbox.receive()
  })
})

test('extract', async t => {
  const inbox = new Inbox()
  const storeReceiver = new StoreReceiver(inbox)
  const receiver = new Receiver(protocol, storeReceiver)
  const testMessage = protocol.Signed.fromObject(testValidMessageObject)
  await receiver.submit(testMessage)
  const packet = inbox.receive()
  const packetObject = protocol.Packet.toObject(packet)
  t.deepEqual(packetObject, testPacketObject)
})
