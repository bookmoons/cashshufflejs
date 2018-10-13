import test from 'ava'
import loadProtocol from 'helper/loadprot'
import { PassThrough } from 'stream'
import { terminatorNodeBuffer } from 'protocol'
import Outchanbin from 'outchanbin/nodestream'
import Outchan from 'outchan/outchanbin/main'
import send from 'outchan/outchanbin/send'

// Signed { signature: Signature { signature: [ 5, 6, 7 ] } }
// Packets { packet: [ <Signed> ] }
let testMessage
const testMessageEncoded = Uint8Array.from([
  0x0a, 0x07, 0x12, 0x05, 0x0a, 0x03, 0x05, 0x06, 0x07
])
const testPackets = Buffer.concat([ testMessageEncoded, terminatorNodeBuffer ])
let protocol

test.before(async t => {
  Object.assign(Outchan.prototype, {
    send
  })
  protocol = await loadProtocol()
  const signature = protocol.Signature.create({
    signature: Uint8Array.from([ 0x05, 0x06, 0x07 ])
  })
  const testPacket = protocol.Signed.create({
    signature
  })
  testMessage = protocol.Packets.create({ packet: [ testPacket ] })
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
  const packets = stream.read()
  verifyIdentical(t, packets, testPackets)
})

test('2 messages', async t => {
  const stream = new PassThrough()
  const outchanbin = new Outchanbin(stream)
  const outchan = new Outchan(outchanbin, protocol)
  await outchan.send(testMessage)
  const packets1 = stream.read()
  verifyIdentical(t, packets1, testPackets)
  await outchan.send(testMessage)
  const packets2 = stream.read()
  verifyIdentical(t, packets2, testPackets)
})
