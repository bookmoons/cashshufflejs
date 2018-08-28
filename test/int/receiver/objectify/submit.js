import test from 'ava'
import loadProtocol from 'helper/loadprot'
import Inbox from 'inbox/fifo'
import StoreReceiver from 'receiver/store'
import Receiver from 'receiver/objectify/main'
import submit from 'receiver/objectify/submit'

const testKey = 'Test key'
const testMessageObject = {
  fromKey: {
    key: testKey
  }
}
let protocol, testMessage

test.before(async t => {
  Object.assign(Receiver.prototype, {
    submit
  })
  protocol = await loadProtocol()
  testMessage = protocol.Packet.fromObject(testMessageObject)
})

test('convert', async t => {
  const inbox = new Inbox()
  const storeReceiver = new StoreReceiver(inbox)
  const receiver = new Receiver(protocol, storeReceiver)
  await receiver.submit(testMessage)
  const messageObject = inbox.receive()
  t.deepEqual(messageObject, testMessageObject)
})
