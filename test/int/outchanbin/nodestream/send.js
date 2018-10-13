import test from 'ava'
import { PassThrough } from 'stream'
import { terminatorNodeBuffer } from 'protocol'
import Outchanbin from 'outchanbin/nodestream/main'
import send from 'outchanbin/nodestream/send'

const testMessageBuffer = Uint8Array.from([ 0x05, 0x06, 0x07 ])
const testPacketBuffer = Buffer.concat([
  testMessageBuffer,
  terminatorNodeBuffer
])
const testMessage = Uint8Array.from(testMessageBuffer).buffer

test.before(t => {
  Object.assign(Outchanbin.prototype, {
    send
  })
})

function verifyIdentical (t, observed, expected) {
  t.is(observed.length, expected.length)
  for (let i = 0; i < observed.length; i++) {
    t.is(observed[i], expected[i])
  }
}

test('1 message', async t => {
  const stream = new PassThrough()
  const outchanbin = new Outchanbin(stream)
  await outchanbin.send(testMessage)
  const packet = stream.read()
  verifyIdentical(t, packet, testPacketBuffer)
})

test('2 messages', async t => {
  const stream = new PassThrough()
  const outchanbin = new Outchanbin(stream)
  await outchanbin.send(testMessage)
  const packet1 = stream.read()
  verifyIdentical(t, packet1, testPacketBuffer)
  await outchanbin.send(testMessage)
  const packet2 = stream.read()
  verifyIdentical(t, packet2, testPacketBuffer)
})
