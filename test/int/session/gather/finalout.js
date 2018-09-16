import test from 'ava'
import { ExhaustionError, TimeoutError } from 'error'
import PhaseReceiver from 'receiver/phase'
import validateFinalOutput from 'session/validate/finalout'
import gatherFinalOutput from 'session/gather/finalout'

const attempts = 2
const timeout = 500
const shuffler1 =
  '03a8213dda332b827cf54c49ac9b3ad4566c293b5da40e7eea5e07c77fe0d5b32e'
const shuffler2 =
  '03b726b7920ec51a575696b368be5470142434124ade29bcee744ae248365ee3b4'
const shuffler3 =
  '036da9c411c438138a73224ebe382f4bfad63d496cf611e91da375d1ebb343ad43'
const shufflers = [ shuffler1, shuffler2, shuffler3 ]
const output1 = 'bitcoincash:qrqpqsvcy94qfm3a8px0sxr5lmm825u3wv3l8fd6xf'
const output2 = 'bitcoincash:qqvm3zp009x5pvaclc7tf3r7h5v2k2le0qxazfnv6w'
const output3 = 'bitcoincash:qqqcrwfqh9jqpq8juwptrw384ltt2qyrcujwunn3v2'
const validPacket1 = {
  fromKey: { key: shuffler3 },
  message: { str: output1 }
}
const validPacket2 = {
  fromKey: { key: shuffler3 },
  message: { str: output2 }
}
const validPacket3 = {
  fromKey: { key: shuffler3 },
  message: { str: output3 }
}
const invalidPacket = {}

function produceSession () {
  const session = {
    validateFinalOutput,
    gatherFinalOutput
  }
  return session
}

test('1 attempt', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(shufflers)
  const inboxes = receiver.shufflerInboxes
  const inbox = inboxes.get(shuffler3)
  const gatherFinalOutputPromise = session.gatherFinalOutput({
    attempts,
    timeout,
    lastShuffler: shuffler3,
    shufflersCount: 3,
    receiver
  })
  inbox.add(validPacket1)
  inbox.add(validPacket2)
  inbox.add(validPacket3)
  const packets = await gatherFinalOutputPromise
  const packet1 = packets.shift()
  t.deepEqual(packet1, validPacket1)
  const packet2 = packets.shift()
  t.deepEqual(packet2, validPacket2)
  const packet3 = packets.shift()
  t.deepEqual(packet3, validPacket3)
})

test('2 attempts', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(shufflers)
  const inboxes = receiver.shufflerInboxes
  const inbox = inboxes.get(shuffler3)
  const gatherFinalOutputPromise = session.gatherFinalOutput({
    attempts,
    timeout,
    lastShuffler: shuffler3,
    shufflersCount: 3,
    receiver
  })
  inbox.add(invalidPacket)
  inbox.add(validPacket1)
  inbox.add(invalidPacket)
  inbox.add(validPacket2)
  inbox.add(invalidPacket)
  inbox.add(validPacket3)
  const packets = await gatherFinalOutputPromise
  const packet1 = packets.shift()
  t.deepEqual(packet1, validPacket1)
  const packet2 = packets.shift()
  t.deepEqual(packet2, validPacket2)
  const packet3 = packets.shift()
  t.deepEqual(packet3, validPacket3)
})

test('exhaust', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(shufflers)
  const inboxes = receiver.shufflerInboxes
  const inbox = inboxes.get(shuffler3)
  const gatherFinalOutputPromise = session.gatherFinalOutput({
    attempts,
    timeout,
    lastShuffler: shuffler3,
    shufflersCount: 3,
    receiver
  })
  inbox.add(invalidPacket)
  inbox.add(validPacket1)
  inbox.add(invalidPacket)
  inbox.add(invalidPacket)
  try {
    await gatherFinalOutputPromise
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof ExhaustionError)
    t.is(e.message, 'max attempts')
  }
})

test('timeout', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(shufflers)
  const gatherFinalOutputPromise = session.gatherFinalOutput({
    attempts,
    timeout: 0,
    lastShuffler: shuffler3,
    shufflersCount: 3,
    receiver
  })
  try {
    await gatherFinalOutputPromise
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof TimeoutError)
  }
})
