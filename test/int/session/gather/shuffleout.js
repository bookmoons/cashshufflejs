import test from 'ava'
import { ExhaustionError, TimeoutError } from 'error'
import PhaseReceiver from 'receiver/phase'
import validateShuffleOutput from 'session/validate/shuffleout'
import gatherShuffleOutput from 'session/gather/shuffleout'

const attempts = 2
const timeout = 500
const shuffler1 =
  '03a8213dda332b827cf54c49ac9b3ad4566c293b5da40e7eea5e07c77fe0d5b32e'
const shuffler2 =
  '03b726b7920ec51a575696b368be5470142434124ade29bcee744ae248365ee3b4'
const shuffler3 =
  '036da9c411c438138a73224ebe382f4bfad63d496cf611e91da375d1ebb343ad43'
const shufflers = [ shuffler1, shuffler2, shuffler3 ]
const output1 =
  'A/Cee7rwlmmxzeM5TbC3LDQI7Qgm+Y15haPOzBSGB1071Zs6T8FR5uuJCTBrBJnGxqv4' +
  'ii6cXLpkVyrcKsK+epO9J6F9V0qkt1Ic0OR32Be5W2ddGr13HQIFS+RltmeACikqq120' +
  'b7GRgFTnvTTuZs8AVKH/AqCvqt5NqT1fiIqW+TEuzvLAd0Y5ABWkG50HIA=='
const output2 =
  'A/Cee7rwlmmxzeM5TbC3LDQI7Qgm+Y15haPOzBSGB107Z9OOF3YyMTsWxBtMOA2Z8OJ+' +
  'EGaJuaoyTQEH8VTwy3ZXvBNbDGY9FTBEpexYbOleNW1dUl6mVkTXOVd9Inf2Vdy3HD4L' +
  'SirOU6qgW01YiBRx6lO3raZrP+mQxTiceI1YehOw56r1rgT6ELISZzpRtQ=='
const validPacket1 = {
  fromKey: { key: shuffler2 },
  toKey: { key: shuffler3 },
  message: { str: output1 }
}
const validPacket2 = {
  fromKey: { key: shuffler2 },
  toKey: { key: shuffler3 },
  message: { str: output2 }
}
const invalidPacket = {}

function produceSession () {
  const session = {
    validateShuffleOutput,
    gatherShuffleOutput
  }
  return session
}

test('1 attempt', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(shufflers)
  const inboxes = receiver.shufflerInboxes
  const inbox = inboxes.get(shuffler2)
  const gatherShuffleOutputPromise = session.gatherShuffleOutput({
    attempts,
    timeout,
    priorShuffler: shuffler2,
    precedingShufflersCount: 2,
    receiver
  })
  inbox.add(validPacket1)
  inbox.add(validPacket2)
  const packets = await gatherShuffleOutputPromise
  const packet1 = packets.shift()
  t.deepEqual(packet1, validPacket1)
  const packet2 = packets.shift()
  t.deepEqual(packet2, validPacket2)
})

test('2 attempts', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(shufflers)
  const inboxes = receiver.shufflerInboxes
  const inbox = inboxes.get(shuffler2)
  const gatherShuffleOutputPromise = session.gatherShuffleOutput({
    attempts,
    timeout,
    priorShuffler: shuffler2,
    precedingShufflersCount: 2,
    receiver
  })
  inbox.add(invalidPacket)
  inbox.add(validPacket1)
  inbox.add(invalidPacket)
  inbox.add(validPacket2)
  const packets = await gatherShuffleOutputPromise
  const packet1 = packets.shift()
  t.deepEqual(packet1, validPacket1)
  const packet2 = packets.shift()
  t.deepEqual(packet2, validPacket2)
})

test('exhaust', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(shufflers)
  const inboxes = receiver.shufflerInboxes
  const inbox = inboxes.get(shuffler2)
  const gatherShuffleOutputPromise = session.gatherShuffleOutput({
    attempts,
    timeout,
    priorShuffler: shuffler2,
    precedingShufflersCount: 2,
    receiver
  })
  inbox.add(invalidPacket)
  inbox.add(validPacket1)
  inbox.add(invalidPacket)
  inbox.add(invalidPacket)
  try {
    await gatherShuffleOutputPromise
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof ExhaustionError)
    t.is(e.message, 'max attempts')
  }
})

test('timeout', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(shufflers)
  const gatherShuffleOutputPromise = session.gatherShuffleOutput({
    attempts,
    timeout: 0,
    priorShuffler: shuffler2,
    precedingShufflersCount: 2,
    receiver
  })
  try {
    await gatherShuffleOutputPromise
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof TimeoutError)
  }
})
