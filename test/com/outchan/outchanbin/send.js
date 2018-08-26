import test from 'ava'
import loadProtocol from 'helper/loadprot'
import { PassThrough } from 'stream'
import { terminatorBuffer } from 'protocol'
import Outchanbin from 'outchanbin/nodestream'
import Outchan from 'outchan/outchanbin/main'
import send from 'outchan/outchanbin/send'

// Signed { signature: Signature { signature: [ 5, 6, 7 ] } }
let testMessage
const testMessageEncoded = Buffer.from([
  0x12, 0x05, 0x0a, 0x03, 0x05, 0x06, 0x07
])
const testPacket = Buffer.concat([ testMessageEncoded, terminatorBuffer ])
let protocol

test.before(async t => {
  Object.assign(Outchan.prototype, {
    send
  })
  protocol = await loadProtocol()
  const signature = protocol.Signature.create({
    signature: Buffer.from([ 0x05, 0x06, 0x07 ])
  })
  testMessage = protocol.Signed.create({
    signature
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
  const outchan = new Outchan(outchanbin, protocol)
  await outchan.send(testMessage)
  const packet = stream.read()
  verifyIdentical(t, packet, testPacket)
})

test('2 messages', async t => {
  const stream = new PassThrough()
  const outchanbin = new Outchanbin(stream)
  const outchan = new Outchan(outchanbin, protocol)
  await outchan.send(testMessage)
  const packet1 = stream.read()
  verifyIdentical(t, packet1, testPacket)
  await outchan.send(testMessage)
  const packet2 = stream.read()
  verifyIdentical(t, packet2, testPacket)
})
