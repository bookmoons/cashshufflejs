import test from 'ava'
import Long from 'long'
import { readTo } from 'promised-read'
import sinon from 'sinon'
import { PassThrough } from 'stream'
import { InadequateError, ValueError } from 'error'
import Outchan from 'outchan/outchanbin'
import Outchanbin from 'outchanbin/nodestream'
import PhaseReceiver from 'receiver/phase'
import Signing from 'signing/bitcore'
import { Phase, terminatorByteLength, terminatorNodeBuffer } from 'protocol'
import { hexToBytes } from 'aid/convert'
import { normalizeProtobufBytes } from 'aid/normalize'
import loadProtocol from 'helper/loadprot'
import affix from 'session/util/affix'
import gatherSignature from 'session/gather/signature'
import messageSignature from 'session/message/signature'
import packageSignedPacket from 'session/util/pack'
import sign from 'session/util/sign'
import validateSignature from 'session/validate/signature'
import submit from 'session/phase/submit'

const attempts = 2
const timeout = 500
const amount = 10
const fee = 2
const sessionId = hexToBytes('1234')
const poolNumber = 12
const signingPrivateKey =
  'b4386d0019b43055341ca3452445cee2805d952fcea1dbb3e7556186df11b958'
const shuffler1 =
  '02fb043436476ebd0391350016a6003f9e02f97e96a9ece386aac2d2060158b377'
const shuffler2 =
  '03b726b7920ec51a575696b368be5470142434124ade29bcee744ae248365ee3b4'
const shuffler3 =
  '036da9c411c438138a73224ebe382f4bfad63d496cf611e91da375d1ebb343ad43'
const shufflers = [ shuffler1, shuffler2, shuffler3 ]
const input1 = 'bitcoincash:qpm9dd5325c8qgtd47y58chax4jxw75hmvd4wptwtn'
const input2 = 'bitcoincash:qpp36jccwkh70rtzk42uue4t635fk9uh0ywdfwxp7p'
const input3 = 'bitcoincash:qqaajfdedtvtpdaax7pgt4hej750pqdrmgcwfzm0ld'
const inputAddresses = new Map([
  [ shuffler1, input1 ],
  [ shuffler2, input2 ],
  [ shuffler3, input3 ]
])
const output1 = 'bitcoincash:qqhrze5zaju6njnlzcgwhkjkrghdkkjulg4v2qsenk'
const output2 = 'bitcoincash:qzgwp2yy8glwq22jkjwx4vzjgurz3edz4skj77krw4'
const output3 = 'bitcoincash:qrasypxak3fnjqtgtjydkrygq2gvccf0vskd2urc59'
const outputAddresses = [ output1, output2, output3 ]
const change1 = 'bitcoincash:qz2ahqhgl636s66qglza4wn89ys4ekwjqqwf5jl4zk'
const change3 = 'bitcoincash:qza2fzdzxjku5ve03tldx45vx30r4tltsq6nr3uax2'
const changeAddresses = new Map([
  [ shuffler1, change1 ],
  [ shuffler3, change3 ]
])
const index11 = '1'
const index12 = '2'
const index2 = Long.fromString('8', true, 10)
const index31 = Long.fromString('54', true, 10)
const index32 = Long.fromString('55', true, 10)
const signature11String = '1111'
const signature12String = '1212'
const signature11 = hexToBytes(signature11String)
const signature12 = hexToBytes(signature12String)
const signature2 = hexToBytes('2222')
const signature31 = hexToBytes('3131')
const signature32 = hexToBytes('3232')
let protocol

const inputSignature11 = [ index11, signature11String ]
const inputSignature12 = [ index12, signature12String ]
const inputSignatures1 = [ inputSignature11, inputSignature12 ]

const inputSignature2 = {
  index: index2,
  signature: { signature: signature2 }
}
const validPacket2 = {
  fromKey: { key: shuffler2 },
  message: { signatures: [ inputSignature2 ] }
}
const inputSignature31 = {
  index: index31,
  signature: { signature: signature31 }
}
const inputSignature32 = {
  index: index32,
  signature: { signature: signature32 }
}
const validPacket3 = {
  fromKey: { key: shuffler3 },
  message: { signatures: [ inputSignature31, inputSignature32 ] }
}

const testInputSignatureObject1 = {
  index: Long.fromString(index11, true, 10),
  signature: { signature: signature11 }
}
const testInputSignatureObject2 = {
  index: Long.fromString(index12, true, 10),
  signature: { signature: signature12 }
}
const testMessageObject = {
  signatures: [ testInputSignatureObject1, testInputSignatureObject2 ]
}
const testPacketObject = {
  session: sessionId,
  number: poolNumber,
  fromKey: { key: shuffler1 },
  phase: Phase.VerificationSubmission.value,
  message: testMessageObject
}
const testSignedObject = { packet: testPacketObject }
const testPacketsObject = { packet: [ testSignedObject ] }

class MockTransaction {}

function produceSession () {
  const session = {
    affix,
    gatherSignature,
    messageSignature,
    packageSignedPacket,
    sign,
    validateSignature,
    submit
  }
  return session
}

function verifyEqualPackets (t, observed, expected) {
  t.is(typeof observed, 'object')
  t.is(typeof expected, 'object')
  t.is(observed.packet.length, expected.packet.length)
  const observedSigned = observed.packet[0]
  const expectedSigned = expected.packet[0]
  const observedPacket = observedSigned.packet
  const expectedPacket = expectedSigned.packet
  t.is(observedPacket.number, expectedPacket.number)
  t.is(observedPacket.phase, expectedPacket.phase)
  const observedSessionId = normalizeProtobufBytes(observedPacket.session)
  const expectedSessionId = normalizeProtobufBytes(expectedPacket.session)
  t.deepEqual(observedSessionId, expectedSessionId)
  const observedFromKey = observedPacket.fromKey.key
  const expectedFromKey = expectedPacket.fromKey.key
  t.is(observedFromKey, expectedFromKey)
  const observedMessage = observedPacket.message
  const expectedMessage = expectedPacket.message
  const observedSignatures = observedMessage.signatures
  const expectedSignatures = expectedMessage.signatures
  t.is(observedSignatures.length, expectedSignatures.length)
  for (let i = 0; i < observedSignatures.length; i++) {
    const observedInputSignature = observedSignatures[i]
    const expectedInputSignature = expectedSignatures[i]
    const observedIndexObject = observedInputSignature.index
    const expectedIndexObject = expectedInputSignature.index
    const observedIndexString = observedIndexObject.toString(10)
    const expectedIndexString = expectedIndexObject.toString(10)
    t.is(observedIndexString, expectedIndexString)
    const observedSignatureObject = observedInputSignature.signature
    const expectedSignatureObject = expectedInputSignature.signature
    const observedSignature = normalizeProtobufBytes(
      observedSignatureObject.signature
    )
    const expectedSignature = normalizeProtobufBytes(
      expectedSignatureObject.signature
    )
    t.deepEqual(observedSignature, expectedSignature)
  }
}

test.before(async t => {
  protocol = await loadProtocol()
})

test('output', async t => {
  const session = produceSession()
  const signing = new Signing()
  await signing.restoreKeyPair(signingPrivateKey)
  const transaction = new MockTransaction()
  const coin = {
    addTransactionSignatures: sinon.stub().returns(transaction),
    broadcastTransaction: sinon.stub(),
    makeUnsignedTransaction: sinon.stub().returns(transaction),
    signTransactionInputs: sinon.stub().returns(inputSignatures1),
    sufficientFunds: sinon.stub().returns(true),
    verifyTransactionSignature: sinon.stub().returns(true)
  }
  const outputStream = new PassThrough()
  const outchanbin = new Outchanbin(outputStream)
  const outchan = new Outchan(outchanbin, protocol)
  const receiver = new PhaseReceiver(shufflers)
  const inboxes = receiver.shufflerInboxes
  const inbox2 = inboxes.get(shuffler2)
  inbox2.add(validPacket2)
  const inbox3 = inboxes.get(shuffler3)
  inbox3.add(validPacket3)
  await session.submit({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber,
    signingKeyPair: signing,
    amount,
    fee,
    inputAddresses,
    outputAddresses,
    changeAddresses,
    coin,
    outchan,
    receiver
  })
  const frameBuffer = await readTo(outputStream, terminatorNodeBuffer)
  const messageLength = frameBuffer.length - terminatorByteLength
  const messageBuffer = frameBuffer.slice(0, messageLength)
  const packets = protocol.Packets.decode(messageBuffer)
  const packetsObject = protocol.Packets.toObject(packets)
  verifyEqualPackets(t, packetsObject, testPacketsObject)
})

test('return', async t => {
  const session = produceSession()
  const signing = new Signing()
  await signing.restoreKeyPair(signingPrivateKey)
  const transaction = new MockTransaction()
  const coin = {
    addTransactionSignatures: sinon.stub().returns(transaction),
    broadcastTransaction: sinon.stub(),
    makeUnsignedTransaction: sinon.stub().returns(transaction),
    signTransactionInputs: sinon.stub().returns(inputSignatures1),
    sufficientFunds: sinon.stub().returns(true),
    verifyTransactionSignature: sinon.stub().returns(true)
  }
  const outputStream = new PassThrough()
  const outchanbin = new Outchanbin(outputStream)
  const outchan = new Outchan(outchanbin, protocol)
  const receiver = new PhaseReceiver(shufflers)
  const inboxes = receiver.shufflerInboxes
  const inbox2 = inboxes.get(shuffler2)
  inbox2.add(validPacket2)
  const inbox3 = inboxes.get(shuffler3)
  inbox3.add(validPacket3)
  const { transaction: returnedTransaction } = await session.submit({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber,
    signingKeyPair: signing,
    amount,
    fee,
    inputAddresses,
    outputAddresses,
    changeAddresses,
    coin,
    outchan,
    receiver
  })
  t.is(returnedTransaction, transaction)
})

test('invalid signature', async t => {
  const session = produceSession()
  const signing = new Signing()
  await signing.restoreKeyPair(signingPrivateKey)
  const transaction = new MockTransaction()
  const coin = {
    addTransactionSignatures: sinon.stub().returns(transaction),
    broadcastTransaction: sinon.stub(),
    makeUnsignedTransaction: sinon.stub().returns(transaction),
    signTransactionInputs: sinon.stub().returns(inputSignatures1),
    sufficientFunds: sinon.stub().returns(true),
    verifyTransactionSignature: sinon.stub().returns(false)
  }
  const outputStream = new PassThrough()
  const outchanbin = new Outchanbin(outputStream)
  const outchan = new Outchan(outchanbin, protocol)
  const receiver = new PhaseReceiver(shufflers)
  const inboxes = receiver.shufflerInboxes
  const inbox2 = inboxes.get(shuffler2)
  inbox2.add(validPacket2)
  const inbox3 = inboxes.get(shuffler3)
  inbox3.add(validPacket3)
  const submitPromise = session.submit({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber,
    signingKeyPair: signing,
    amount,
    fee,
    inputAddresses,
    outputAddresses,
    changeAddresses,
    coin,
    outchan,
    receiver
  })
  try {
    await submitPromise
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof ValueError)
    t.is(e.message, 'invalid signature')
  }
})

test('double spend', async t => {
  const session = produceSession()
  const signing = new Signing()
  await signing.restoreKeyPair(signingPrivateKey)
  const transaction = new MockTransaction()
  const coin = {
    addTransactionSignatures: sinon.stub().returns(transaction),
    broadcastTransaction: sinon.stub(),
    makeUnsignedTransaction: sinon.stub().returns(transaction),
    signTransactionInputs: sinon.stub().returns(inputSignatures1),
    sufficientFunds: sinon.stub().returns(false),
    verifyTransactionSignature: sinon.stub().returns(true)
  }
  const outputStream = new PassThrough()
  const outchanbin = new Outchanbin(outputStream)
  const outchan = new Outchan(outchanbin, protocol)
  const receiver = new PhaseReceiver(shufflers)
  const inboxes = receiver.shufflerInboxes
  const inbox2 = inboxes.get(shuffler2)
  inbox2.add(validPacket2)
  const inbox3 = inboxes.get(shuffler3)
  inbox3.add(validPacket3)
  const submitPromise = session.submit({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber,
    signingKeyPair: signing,
    amount,
    fee,
    inputAddresses,
    outputAddresses,
    changeAddresses,
    coin,
    outchan,
    receiver
  })
  try {
    await submitPromise
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof InadequateError)
    t.is(e.message, 'insufficient funds')
  }
})
