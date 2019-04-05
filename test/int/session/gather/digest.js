import test from 'ava'
import { ExhaustionError, TimeoutError } from 'error'
import PhaseReceiver from 'receiver/phase'
import { hexToBytes } from '/aid/convert'
import validateDigest from 'session/validate/digest'
import gatherDigest from 'session/gather/digest'

const attempts = 2
const timeout = 500
const shuffler1Hex =
  '03a8213dda332b827cf54c49ac9b3ad4566c293b5da40e7eea5e07c77fe0d5b32e'
const shuffler2Hex =
  '03b726b7920ec51a575696b368be5470142434124ade29bcee744ae248365ee3b4'
const shuffler3Hex =
  '036da9c411c438138a73224ebe382f4bfad63d496cf611e91da375d1ebb343ad43'
const shuffler1 = hexToBytes(shuffler1Hex)
const shufflers = [ shuffler1Hex, shuffler2Hex, shuffler3Hex ]
const digest2 = hexToBytes('1234')
const digest3 = hexToBytes('5678')
const validPacket2 = {
  fromKey: { key: shuffler2Hex },
  message: { hash: { hash: digest2 } }
}
const validPacket3 = {
  fromKey: { key: shuffler3Hex },
  message: { hash: { hash: digest3 } }
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
  const receiver = new PhaseReceiver(shufflers)
  const inboxes = receiver.shufflerInboxes
  const gatherDigestPromise = session.gatherDigest({
    attempts,
    timeout,
    signingPublicKey: shuffler1,
    receiver
  })
  const inbox2 = inboxes.get(shuffler2Hex)
  inbox2.add(validPacket2)
  const inbox3 = inboxes.get(shuffler3Hex)
  inbox3.add(validPacket3)
  const shufflerPackets = await gatherDigestPromise
  const shuffler2Packet = shufflerPackets.get(shuffler2Hex)
  t.deepEqual(shuffler2Packet, validPacket2)
  const shuffler3Packet = shufflerPackets.get(shuffler3Hex)
  t.deepEqual(shuffler3Packet, validPacket3)
})

test('2 attempts', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(shufflers)
  const inboxes = receiver.shufflerInboxes
  const gatherDigestPromise = session.gatherDigest({
    attempts,
    timeout,
    signingPublicKey: shuffler1,
    receiver
  })
  const inbox2 = inboxes.get(shuffler2Hex)
  inbox2.add(validPacket2)
  const inbox3 = inboxes.get(shuffler3Hex)
  inbox3.add(invalidPacket)
  inbox3.add(validPacket3)
  const shufflerPackets = await gatherDigestPromise
  const shuffler2Packet = shufflerPackets.get(shuffler2Hex)
  t.deepEqual(shuffler2Packet, validPacket2)
  const shuffler3Packet = shufflerPackets.get(shuffler3Hex)
  t.deepEqual(shuffler3Packet, validPacket3)
})

test('timeout', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(shufflers)
  const gatherDigestPromise = session.gatherDigest({
    attempts,
    timeout: 0,
    signingPublicKey: shuffler1,
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
  const receiver = new PhaseReceiver(shufflers)
  const inboxes = receiver.shufflerInboxes
  const gatherDigestPromise = session.gatherDigest({
    attempts,
    timeout,
    signingPublicKey: shuffler1,
    receiver
  })
  const inbox2 = inboxes.get(shuffler2Hex)
  inbox2.add(invalidPacket)
  inbox2.add(validPacket2)
  const inbox3 = inboxes.get(shuffler3Hex)
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
