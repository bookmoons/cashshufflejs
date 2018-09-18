import test from 'ava'
import Long from 'long'
import { ExhaustionError, TimeoutError } from 'error'
import PhaseReceiver from 'receiver/phase'
import { hexToBytes } from 'aid/convert'
import validateSignature from 'session/validate/signature'
import gatherSignature from 'session/gather/signature'

const attempts = 2
const timeout = 500
const shuffler1 =
  '03a8213dda332b827cf54c49ac9b3ad4566c293b5da40e7eea5e07c77fe0d5b32e'
const shuffler2 =
  '03b726b7920ec51a575696b368be5470142434124ade29bcee744ae248365ee3b4'
const shuffler3 =
  '036da9c411c438138a73224ebe382f4bfad63d496cf611e91da375d1ebb343ad43'
const shufflers = [ shuffler1, shuffler2, shuffler3 ]
const index2 = Long.fromString('1', true, 10)
const signature2 = hexToBytes('1234')
const inputSignature2 = {
  index: index2,
  signature: { signature: signature2 }
}
const validPacket2 = {
  fromKey: { key: shuffler2 },
  message: { signatures: [ inputSignature2 ] }
}
const index3 = Long.fromString('2', true, 10)
const signature3 = hexToBytes('ABCD')
const inputSignature3 = {
  index: index3,
  signature: { signature: signature3 }
}
const validPacket3 = {
  fromKey: { key: shuffler3 },
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
  const receiver = new PhaseReceiver(shufflers)
  const inboxes = receiver.shufflerInboxes
  const gatherSignaturePromise = session.gatherSignature({
    attempts,
    timeout,
    signingPublicKey: shuffler1,
    receiver
  })
  const inbox2 = inboxes.get(shuffler2)
  inbox2.add(validPacket2)
  const inbox3 = inboxes.get(shuffler3)
  inbox3.add(validPacket3)
  const shufflerPackets = await gatherSignaturePromise
  const shuffler2Packet = shufflerPackets.get(shuffler2)
  t.deepEqual(shuffler2Packet, validPacket2)
  const shuffler3Packet = shufflerPackets.get(shuffler3)
  t.deepEqual(shuffler3Packet, validPacket3)
})

test('2 attempts', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(shufflers)
  const inboxes = receiver.shufflerInboxes
  const gatherSignaturePromise = session.gatherSignature({
    attempts,
    timeout,
    signingPublicKey: shuffler1,
    receiver
  })
  const inbox2 = inboxes.get(shuffler2)
  inbox2.add(validPacket2)
  const inbox3 = inboxes.get(shuffler3)
  inbox3.add(invalidPacket)
  inbox3.add(validPacket3)
  const shufflerPackets = await gatherSignaturePromise
  const shuffler2Packet = shufflerPackets.get(shuffler2)
  t.deepEqual(shuffler2Packet, validPacket2)
  const shuffler3Packet = shufflerPackets.get(shuffler3)
  t.deepEqual(shuffler3Packet, validPacket3)
})

test('timeout', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(shufflers)
  const gatherSignaturePromise = session.gatherSignature({
    attempts,
    timeout: 0,
    signingPublicKey: shuffler1,
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
  const receiver = new PhaseReceiver(shufflers)
  const inboxes = receiver.shufflerInboxes
  const gatherSignaturePromise = session.gatherSignature({
    attempts,
    timeout,
    signingPublicKey: shuffler1,
    receiver
  })
  const inbox2 = inboxes.get(shuffler2)
  inbox2.add(invalidPacket)
  inbox2.add(validPacket2)
  const inbox3 = inboxes.get(shuffler3)
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
