import test from 'ava'
import { PassThrough } from 'stream'
import loadProtocol from 'helper/loadprot'
import { terminatorBuffer } from 'protocol'
import Inchanbin from 'inchanbin/nodestream'
import Inchan from 'inchan/inchanbin'
import Inbox from 'inbox/fifo'
import StoreReceiver from 'receiver/store'
import StandardDrawer from 'drawer/standard/main'
import start from 'drawer/standard/start'
import stop from 'drawer/standard/stop'
import watch from 'drawer/standard/watch'

const testSignedObject1 = { packet: { fromKey: { key: 'Test key 1' } } }
const testSignedObject2 = { packet: { fromKey: { key: 'Test key 2' } } }
let protocol

test.before(async t => {
  Object.assign(StandardDrawer.prototype, {
    start,
    stop
  })
  Object.defineProperty(StandardDrawer.prototype, 'watch', {
    get: watch
  })
  protocol = await loadProtocol()
})

test('1 message', async t => {
  const stream = new PassThrough()
  const inchanbin = new Inchanbin(stream)
  const inchan = new Inchan(inchanbin, protocol)
  const inbox = new Inbox()
  const receiver = new StoreReceiver(inbox)
  const drawer = new StandardDrawer(inchan, receiver)
  await drawer.start()
  const messageDrawn = drawer.watch
  const testMessage = protocol.Signed.fromObject(testSignedObject1)
  const testMessageEncoded = protocol.Signed.encode(testMessage).finish()
  const testMessageBuffer = Buffer.from(testMessageEncoded) // Normalize
  stream.write(testMessageBuffer)
  stream.write(terminatorBuffer)
  await messageDrawn
  const message = inbox.receive()
  const messageObject = protocol.Signed.toObject(message)
  t.deepEqual(messageObject, testSignedObject1)
})

test('2 messages', async t => {
  const stream = new PassThrough()
  const inchanbin = new Inchanbin(stream)
  const inchan = new Inchan(inchanbin, protocol)
  const inbox = new Inbox()
  const receiver = new StoreReceiver(inbox)
  const drawer = new StandardDrawer(inchan, receiver)
  await drawer.start()
  const message1Drawn = drawer.watch
  const testMessage1 = protocol.Signed.fromObject(testSignedObject1)
  const testMessage1Encoded = protocol.Signed.encode(testMessage1).finish()
  const testMessage1Buffer = Buffer.from(testMessage1Encoded) // Normalize
  stream.write(testMessage1Buffer)
  stream.write(terminatorBuffer)
  await message1Drawn
  const message2Drawn = drawer.watch
  const testMessage2 = protocol.Signed.fromObject(testSignedObject2)
  const testMessage2Encoded = protocol.Signed.encode(testMessage2).finish()
  const testMessage2Buffer = Buffer.from(testMessage2Encoded)
  stream.write(testMessage2Buffer)
  stream.write(terminatorBuffer)
  await message2Drawn
  const message1 = inbox.receive()
  const message1Object = protocol.Signed.toObject(message1)
  t.deepEqual(message1Object, testSignedObject1)
  const message2 = inbox.receive()
  const message2Object = protocol.Signed.toObject(message2)
  t.deepEqual(message2Object, testSignedObject2)
})
