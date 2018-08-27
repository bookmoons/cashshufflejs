import test from 'ava'
import sinon from 'sinon'
import { ExhaustionError, TimeoutError } from 'error'
import PhaseReceiver from 'receiver/phase'
import validateAnnounce from 'session/validate/announce'
import gatherAnnounce from 'session/gather/announce'

const attempts = 2
const timeout = 500
const amount = 5
const participant1 =
  '03a8213dda332b827cf54c49ac9b3ad4566c293b5da40e7eea5e07c77fe0d5b32e'
const participant2 =
  '03b726b7920ec51a575696b368be5470142434124ade29bcee744ae248365ee3b4'
const participant3 =
  '036da9c411c438138a73224ebe382f4bfad63d496cf611e91da375d1ebb343ad43'
const participants = [ participant1, participant2, participant3 ]
const encryptionKey2 =
  '0376e48539f388b2c5df77a1314ab05483e9da31112ffc8d9efb7dac9df1e8fe60'
const encryptionKey3 =
  '039a950dd71620d3f638500ed27dfcf20e17f074721ef9e203673eca86938c490c'
const validPacket2 = {
  fromKey: { key: participant2 },
  message: { key: { key: encryptionKey2 } }
}
const validPacket3 = {
  fromKey: { key: participant3 },
  message: { key: { key: encryptionKey3 } }
}
const invalidPacket = {}

test('1 attempt', async t => {
  const session = {
    gatherAnnounce,
    validateAnnounce
  }
  const coin = {
    sufficientFunds: sinon.stub().returns(true)
  }
  const receiver = new PhaseReceiver(participants)
  const inboxes = receiver.participantInboxes
  const gatherAnnouncePromise = session.gatherAnnounce({
    attempts,
    timeout,
    signingPublicKey: participant1,
    amount,
    coin,
    receiver
  })
  const inbox2 = inboxes.get(participant2)
  inbox2.add(validPacket2)
  const inbox3 = inboxes.get(participant3)
  inbox3.add(validPacket3)
  const participantPackets = await gatherAnnouncePromise
  const participant2Packet = participantPackets.get(participant2)
  t.deepEqual(participant2Packet, validPacket2)
  const participant3Packet = participantPackets.get(participant3)
  t.deepEqual(participant3Packet, validPacket3)
})

test('2 attempts', async t => {
  const session = {
    gatherAnnounce,
    validateAnnounce
  }
  const coin = {
    sufficientFunds: sinon.stub().returns(true)
  }
  const receiver = new PhaseReceiver(participants)
  const inboxes = receiver.participantInboxes
  const gatherAnnouncePromise = session.gatherAnnounce({
    attempts,
    timeout,
    signingPublicKey: participant1,
    amount,
    coin,
    receiver
  })
  const inbox2 = inboxes.get(participant2)
  inbox2.add(validPacket2)
  const inbox3 = inboxes.get(participant3)
  inbox3.add(invalidPacket)
  inbox3.add(validPacket3)
  const participantPackets = await gatherAnnouncePromise
  const participant2Packet = participantPackets.get(participant2)
  t.deepEqual(participant2Packet, validPacket2)
  const participant3Packet = participantPackets.get(participant3)
  t.deepEqual(participant3Packet, validPacket3)
})

test('timeout', async t => {
  const session = {
    gatherAnnounce,
    validateAnnounce
  }
  const coin = {
    sufficientFunds: sinon.stub().returns(true)
  }
  const receiver = new PhaseReceiver(participants)
  const gatherAnnouncePromise = session.gatherAnnounce({
    attempts,
    timeout: 0,
    signingPublicKey: participant1,
    amount,
    coin,
    receiver
  })
  try {
    await gatherAnnouncePromise
    t.fail('Incorrect successful gather')
  } catch (e) {
    t.true(e instanceof TimeoutError)
  }
})

test('exhaust', async t => {
  const session = {
    gatherAnnounce,
    validateAnnounce
  }
  const coin = {
    sufficientFunds: sinon.stub().returns(true)
  }
  const receiver = new PhaseReceiver(participants)
  const inboxes = receiver.participantInboxes
  const gatherAnnouncePromise = session.gatherAnnounce({
    attempts,
    timeout,
    signingPublicKey: participant1,
    amount,
    coin,
    receiver
  })
  const inbox2 = inboxes.get(participant2)
  inbox2.add(invalidPacket)
  inbox2.add(validPacket2)
  const inbox3 = inboxes.get(participant3)
  inbox3.add(invalidPacket)
  inbox3.add(invalidPacket)
  try {
    await gatherAnnouncePromise
    t.fail('Incorrect successful gather')
  } catch (e) {
    t.true(e instanceof ExhaustionError)
    t.is(e.message, 'max attempts')
  }
})
