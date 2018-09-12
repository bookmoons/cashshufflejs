import test from 'ava'
import Long from 'long'
import { ExhaustionError, TimeoutError } from 'error'
import PhaseReceiver from 'receiver/phase'
import toArrayBuffer from 'util/toarraybuffer'
import validateSignature from 'session/validate/signature'
import gatherSignature from 'session/gather/signature'

const attempts = 2
const timeout = 500
const participant1 =
  '03a8213dda332b827cf54c49ac9b3ad4566c293b5da40e7eea5e07c77fe0d5b32e'
const participant2 =
  '03b726b7920ec51a575696b368be5470142434124ade29bcee744ae248365ee3b4'
const participant3 =
  '036da9c411c438138a73224ebe382f4bfad63d496cf611e91da375d1ebb343ad43'
const participants = [ participant1, participant2, participant3 ]
const index2 = Long.fromString('1', true, 10)
const signature2String = '1234'
const signature2Buffer = Buffer.from(signature2String, 'hex')
const signature2 = toArrayBuffer(signature2Buffer)
const signature2View = new Uint8Array(signature2)
const inputSignature2 = {
  index: index2,
  signature: { signature: signature2View }
}
const validPacket2 = {
  fromKey: { key: participant2 },
  message: { signatures: [ inputSignature2 ] }
}
const index3 = Long.fromString('2', true, 10)
const signature3String = 'ABCD'
const signature3Buffer = Buffer.from(signature3String, 'hex')
const signature3 = toArrayBuffer(signature3Buffer)
const signature3View = new Uint8Array(signature3)
const inputSignature3 = {
  index: index3,
  signature: { signature: signature3View }
}
const validPacket3 = {
  fromKey: { key: participant3 },
  message: { signatures: [ inputSignature3 ] }
}
const invalidPacket = {}

function produceSession () {
  const session = {
    validateSignature,
    gatherSignature
  }
  return session
}

test('1 attempt', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(participants)
  const inboxes = receiver.participantInboxes
  const gatherSignaturePromise = session.gatherSignature({
    attempts,
    timeout,
    signingPublicKey: participant1,
    receiver
  })
  const inbox2 = inboxes.get(participant2)
  inbox2.add(validPacket2)
  const inbox3 = inboxes.get(participant3)
  inbox3.add(validPacket3)
  const participantPackets = await gatherSignaturePromise
  const participant2Packet = participantPackets.get(participant2)
  t.deepEqual(participant2Packet, validPacket2)
  const participant3Packet = participantPackets.get(participant3)
  t.deepEqual(participant3Packet, validPacket3)
})

test('2 attempts', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(participants)
  const inboxes = receiver.participantInboxes
  const gatherSignaturePromise = session.gatherSignature({
    attempts,
    timeout,
    signingPublicKey: participant1,
    receiver
  })
  const inbox2 = inboxes.get(participant2)
  inbox2.add(validPacket2)
  const inbox3 = inboxes.get(participant3)
  inbox3.add(invalidPacket)
  inbox3.add(validPacket3)
  const participantPackets = await gatherSignaturePromise
  const participant2Packet = participantPackets.get(participant2)
  t.deepEqual(participant2Packet, validPacket2)
  const participant3Packet = participantPackets.get(participant3)
  t.deepEqual(participant3Packet, validPacket3)
})

test('timeout', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(participants)
  const gatherSignaturePromise = session.gatherSignature({
    attempts,
    timeout: 0,
    signingPublicKey: participant1,
    receiver
  })
  try {
    await gatherSignaturePromise
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof TimeoutError)
  }
})

test('exhaust', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(participants)
  const inboxes = receiver.participantInboxes
  const gatherSignaturePromise = session.gatherSignature({
    attempts,
    timeout,
    signingPublicKey: participant1,
    receiver
  })
  const inbox2 = inboxes.get(participant2)
  inbox2.add(invalidPacket)
  inbox2.add(validPacket2)
  const inbox3 = inboxes.get(participant3)
  inbox3.add(invalidPacket)
  inbox3.add(invalidPacket)
  try {
    await gatherSignaturePromise
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof ExhaustionError)
    t.is(e.message, 'max attempts')
  }
})