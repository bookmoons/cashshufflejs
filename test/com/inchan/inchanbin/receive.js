import test from 'ava'
import path from 'path'
import protobuf from 'protobufjs'
import { PassThrough } from 'stream'
import { terminatorBuffer } from 'protocol'
import Inchanbin from 'inchanbin/nodestream'
import Inchan from 'inchan/inchanbin/main'
import init from 'inchan/inchanbin/init'
import receive from 'inchan/inchanbin/receive'

const testSignature = Buffer.from([ 0x01, 0x02, 0x03 ])
// Signed { signature: Signature { signature: [ 1, 2, 3 ] } }
const testMessageEncoded = Buffer.from([
  0x12, 0x05, 0x0a, 0x03, 0x01, 0x02, 0x03
])
const testPacket = Buffer.concat([ testMessageEncoded, terminatorBuffer ])
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
  Object.assign(Inchan.prototype, {
    init,
    receive
  })
  protocol = await loadProtocol()
})

function verifyIdentical (t, output, expected) {
  t.is(output[0], expected[0])
  t.is(output[1], expected[1])
  t.is(output[2], expected[2])
}

test('1 message', async t => {
  const stream = new PassThrough()
  const inchanbin = new Inchanbin(stream)
  const inchan = new Inchan(inchanbin, protocol)
  await inchan.init()
  stream.write(testPacket)
  const message = await inchan.receive()
  const signature = message.signature
  const signatureBytes = signature.signature
  verifyIdentical(t, signatureBytes, testSignature)
})

test('2 messages', async t => {
  const stream = new PassThrough()
  const inchanbin = new Inchanbin(stream)
  const inchan = new Inchan(inchanbin, protocol)
  await inchan.init()
  stream.write(testPacket)
  stream.write(testPacket)
  const message1 = await inchan.receive()
  const signature1 = message1.signature
  const signatureBytes1 = signature1.signature
  verifyIdentical(t, signatureBytes1, testSignature)
  const message2 = await inchan.receive()
  const signature2 = message2.signature
  const signatureBytes2 = signature2.signature
  verifyIdentical(t, signatureBytes2, testSignature)
})
