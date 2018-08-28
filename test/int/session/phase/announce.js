import test from 'ava'
import { readTo } from 'promised-read'
import sinon from 'sinon'
import { PassThrough } from 'stream'
import { InadequateError } from 'error'
import Outchan from 'outchan/outchanbin'
import Outchanbin from 'outchanbin/nodestream'
import PhaseReceiver from 'receiver/phase'
import Signing from 'signing/bitcore'
import { terminatorByteLength, terminatorBuffer } from 'protocol'
import toArrayBuffer from 'util/toarraybuffer'
import loadProtocol from 'helper/loadprot'
import affix from 'session/affix'
import gatherAnnounce from 'session/gather/announce'
import messageAnnounce from 'session/message/announce'
import packageSignedPacket from 'session/package'
import validateAnnounce from 'session/validate/announce'
import sign from 'session/sign'
import announce from 'session/phase/announce'

const phaseIdentifier = 1
const attempts = 2
const timeout = 500
const amount = 5
const sessionId = toArrayBuffer(Buffer.from('123'))
const sessionIdView = new Uint8Array(sessionId)
const participantNumber = 3
const signingPrivateKey =
  'b4386d0019b43055341ca3452445cee2805d952fcea1dbb3e7556186df11b958'
const participant1 =
  '02fb043436476ebd0391350016a6003f9e02f97e96a9ece386aac2d2060158b377'
const participant2 =
  '03b726b7920ec51a575696b368be5470142434124ade29bcee744ae248365ee3b4'
const participant3 =
  '036da9c411c438138a73224ebe382f4bfad63d496cf611e91da375d1ebb343ad43'
const participants = [ participant1, participant2, participant3 ]
const testEncryptionKey2 =
  '0376e48539f388b2c5df77a1314ab05483e9da31112ffc8d9efb7dac9df1e8fe60'
const testEncryptionKey3 =
  '039a950dd71620d3f638500ed27dfcf20e17f074721ef9e203673eca86938c490c'
const validPacket2 = {
  fromKey: { key: participant2 },
  message: { key: { key: testEncryptionKey2 } }
}
const validPacket3 = {
  fromKey: { key: participant3 },
  message: { key: { key: testEncryptionKey3 } }
}
const invalidPacket = {}
let protocol

const testPacketObject = {
  session: sessionIdView,
  number: participantNumber,
  phase: phaseIdentifier
}
const testSignedObject = { packet: testPacketObject }
const testPacketsObject = { packet: [ testSignedObject ] }

function produceSession () {
  const session = {
    affix,
    announce,
    gatherAnnounce,
    messageAnnounce,
    packageSignedPacket,
    validateAnnounce,
    sign
  }
  return session
}

function verifyEqualPackets (t, observed, expected) {
  t.is(typeof observed, typeof expected)
  t.is(observed.packet.length, expected.packet.length)
  const observedSigned = observed.packet[0]
  const expectedSigned = expected.packet[0]
  const observedPacket = observedSigned.packet
  const expectedPacket = expectedSigned.packet
  t.is(observedPacket.number, expectedPacket.number)
  t.is(observedPacket.phase, expectedPacket.phase)
  const observedSessionId = Buffer.from(observedPacket.session)
  const expectedSessionId = Buffer.from(expectedPacket.session)
  t.deepEqual(observedSessionId, expectedSessionId)
}

test.before(async t => {
  protocol = await loadProtocol()
})

test('output', async t => {
  const session = produceSession()
  const signing = new Signing()
  await signing.restoreKeyPair(signingPrivateKey)
  const coin = {
    sufficientFunds: sinon.stub().returns(true)
  }
  const outputStream = new PassThrough()
  const outchanbin = new Outchanbin(outputStream)
  const outchan = new Outchan(outchanbin, protocol)
  const receiver = new PhaseReceiver(participants)
  const inboxes = receiver.participantInboxes
  const inbox2 = inboxes.get(participant2)
  inbox2.add(validPacket2)
  const inbox3 = inboxes.get(participant3)
  inbox3.add(validPacket3)
  await session.announce({
    protocol,
    attempts,
    timeout,
    sessionId,
    participantNumber,
    signingKeyPair: signing,
    amount,
    coin,
    outchan,
    receiver
  })
  const frameBuffer = await readTo(outputStream, terminatorBuffer)
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
  const coin = {
    sufficientFunds: sinon.stub().returns(true)
  }
  const outputStream = new PassThrough()
  const outchanbin = new Outchanbin(outputStream)
  const outchan = new Outchan(outchanbin, protocol)
  const receiver = new PhaseReceiver(participants)
  const inboxes = receiver.participantInboxes
  const inbox2 = inboxes.get(participant2)
  inbox2.add(validPacket2)
  const inbox3 = inboxes.get(participant3)
  inbox3.add(validPacket3)
  const { encryptionPublicKeys } = await session.announce({
    protocol,
    attempts,
    timeout,
    sessionId,
    participantNumber,
    signingKeyPair: signing,
    amount,
    coin,
    outchan,
    receiver
  })
  const encryptionKey2 = encryptionPublicKeys.get(participant2)
  t.is(encryptionKey2, testEncryptionKey2)
  const encryptionKey3 = encryptionPublicKeys.get(participant3)
  t.is(encryptionKey3, testEncryptionKey3)
})

test('encryption key pair', async t => {
  const session = produceSession()
  const signing = new Signing()
  await signing.restoreKeyPair(signingPrivateKey)
  const coin = {
    sufficientFunds: sinon.stub().returns(true)
  }
  const outputStream = new PassThrough()
  const outchanbin = new Outchanbin(outputStream)
  const outchan = new Outchan(outchanbin, protocol)
  const receiver = new PhaseReceiver(participants)
  const inboxes = receiver.participantInboxes
  const inbox2 = inboxes.get(participant2)
  inbox2.add(validPacket2)
  const inbox3 = inboxes.get(participant3)
  inbox3.add(validPacket3)
  const { encryptionKeyPair } = await session.announce({
    protocol,
    attempts,
    timeout,
    sessionId,
    participantNumber,
    signingKeyPair: signing,
    amount,
    coin,
    outchan,
    receiver
  })
  const encryptionPublicKey = await encryptionKeyPair.exportPublicKey()
  t.is(typeof encryptionPublicKey, 'string')
})

test('fail', async t => {
  const session = produceSession()
  const signing = new Signing()
  await signing.restoreKeyPair(signingPrivateKey)
  const coin = {
    sufficientFunds: sinon.stub().returns(false)
  }
  const outputStream = new PassThrough()
  const outchanbin = new Outchanbin(outputStream)
  const outchan = new Outchan(outchanbin, protocol)
  const receiver = new PhaseReceiver(participants)
  const inboxes = receiver.participantInboxes
  const inbox2 = inboxes.get(participant2)
  inbox2.add(validPacket2)
  const inbox3 = inboxes.get(participant3)
  inbox3.add(validPacket3)
  const announcePromise = session.announce({
    protocol,
    attempts,
    timeout,
    sessionId,
    participantNumber,
    signingKeyPair: signing,
    amount,
    coin,
    outchan,
    receiver
  })
  try {
    await announcePromise
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof InadequateError)
    t.is(e.message, 'insufficient funds')
  }
})
