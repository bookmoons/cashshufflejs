import test from 'ava'
import { ExhaustionError, TimeoutError } from 'error'
import PhaseReceiver from 'receiver/phase'
import toArrayBuffer from 'util/toarraybuffer'
import validateDigest from 'session/validate/digest'
import gatherDigest from 'session/gather/digest'

const attempts = 2
const timeout = 500
const participant1 =
  '03a8213dda332b827cf54c49ac9b3ad4566c293b5da40e7eea5e07c77fe0d5b32e'
const participant2 =
  '03b726b7920ec51a575696b368be5470142434124ade29bcee744ae248365ee3b4'
const participant3 =
  '036da9c411c438138a73224ebe382f4bfad63d496cf611e91da375d1ebb343ad43'
const participants = [ participant1, participant2, participant3 ]
const digestBuffer2 = Buffer.from('123', 'hex')
const digest2 = toArrayBuffer(digestBuffer2)
const digestView2 = new Uint8Array(digest2)
const digestBuffer3 = Buffer.from('456', 'hex')
const digest3 = toArrayBuffer(digestBuffer3)
const digestView3 = new Uint8Array(digest3)
const validPacket2 = {
  fromKey: { key: participant2 },
  message: { hash: { hash: digestView2 } }
}
const validPacket3 = {
  fromKey: { key: participant3 },
  message: { hash: { hash: digestView3 } }
}
const invalidPacket = {}

function produceSession () {
  const session = {
    validateDigest,
    gatherDigest
  }
  return session
}

test('1 attempt', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(participants)
  const inboxes = receiver.participantInboxes
  const gatherDigestPromise = session.gatherDigest({
    attempts,
    timeout,
    signingPublicKey: participant1,
    receiver
  })
  const inbox2 = inboxes.get(participant2)
  inbox2.add(validPacket2)
  const inbox3 = inboxes.get(participant3)
  inbox3.add(validPacket3)
  const participantPackets = await gatherDigestPromise
  const participant2Packet = participantPackets.get(participant2)
  t.deepEqual(participant2Packet, validPacket2)
  const participant3Packet = participantPackets.get(participant3)
  t.deepEqual(participant3Packet, validPacket3)
})

test('2 attempts', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(participants)
  const inboxes = receiver.participantInboxes
  const gatherDigestPromise = session.gatherDigest({
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
  const participantPackets = await gatherDigestPromise
  const participant2Packet = participantPackets.get(participant2)
  t.deepEqual(participant2Packet, validPacket2)
  const participant3Packet = participantPackets.get(participant3)
  t.deepEqual(participant3Packet, validPacket3)
})

test('timeout', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(participants)
  const gatherDigestPromise = session.gatherDigest({
    attempts,
    timeout: 0,
    signingPublicKey: participant1,
    receiver
  })
  try {
    await gatherDigestPromise
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof TimeoutError)
  }
})

test('exhaust', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(participants)
  const inboxes = receiver.participantInboxes
  const gatherDigestPromise = session.gatherDigest({
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
    await gatherDigestPromise
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof ExhaustionError)
    t.is(e.message, 'max attempts')
  }
})
