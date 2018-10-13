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

function verifyIdentical (t, binary, buffer) {
  t.is(binary.byteLength, buffer.length)
  const binaryView = new Uint8Array(binary)
  for (let i = 0; i < binary.byteLength; i++) {
    t.is(binaryView[i], buffer[i])
  }
}

test('1 message', async t => {
  const stream = new PassThrough()
  const inchanbin = new Inchanbin(stream)
  stream.write(testPacket)
  const message = await inchanbin.receive()
  verifyIdentical(t, message, testMessage)
})

test('2 messages', async t => {
  const stream = new PassThrough()
  const inchanbin = new Inchanbin(stream)
  stream.write(testPacket)
  stream.write(testPacket)
  const message1 = await inchanbin.receive()
  verifyIdentical(t, message1, testMessage)
  const message2 = await inchanbin.receive()
  verifyIdentical(t, message2, testMessage)
})
