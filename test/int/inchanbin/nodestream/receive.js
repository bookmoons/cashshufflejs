import test from 'ava'
import { PassThrough } from 'stream'
import { terminatorNodeBuffer } from 'protocol'
import Inchanbin from 'inchanbin/nodestream/main'
import receive from 'inchanbin/nodestream/receive'

const testMessage = Uint8Array.from([ 0x05, 0x06, 0x07 ])
const testPacket = Buffer.concat([ testMessage, terminatorNodeBuffer ])

test.before(t => {
  Object.assign(Inchanbin.prototype, {
    receive
  })
})

test('1 message', async t => {
  const stream = new PassThrough()
  const inchanbin = new Inchanbin(stream)
  stream.write(testPacket)
  const message = await inchanbin.receive()
  t.deepEqual(message, testMessage)
})

test('2 messages', async t => {
  const stream = new PassThrough()
  const inchanbin = new Inchanbin(stream)
  stream.write(testPacket)
  stream.write(testPacket)
  const message1 = await inchanbin.receive()
  t.deepEqual(message1, testMessage)
  const message2 = await inchanbin.receive()
  t.deepEqual(message2, testMessage)
})
