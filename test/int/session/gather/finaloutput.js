import test from 'ava'
import { ExhaustionError, TimeoutError } from 'error'
import PhaseReceiver from 'receiver/phase'
import { outputListDelimiter } from 'session/value'
import validateFinalOutput from 'session/validate/finaloutput'
import gatherFinalOutput from 'session/gather/finaloutput'

const attempts = 2
const timeout = 500
const shuffler1 =
  '03a8213dda332b827cf54c49ac9b3ad4566c293b5da40e7eea5e07c77fe0d5b32e'
const shuffler2 =
  '03b726b7920ec51a575696b368be5470142434124ade29bcee744ae248365ee3b4'
const shuffler3 =
  '036da9c411c438138a73224ebe382f4bfad63d496cf611e91da375d1ebb343ad43'
const shufflers = [ shuffler1, shuffler2, shuffler3 ]
const lastShuffler = shuffler3
const output1 = 'bitcoincash:qrqpqsvcy94qfm3a8px0sxr5lmm825u3wv3l8fd6xf'
const output2 = 'bitcoincash:qqvm3zp009x5pvaclc7tf3r7h5v2k2le0qxazfnv6w'
const output3 = 'bitcoincash:qqqcrwfqh9jqpq8juwptrw384ltt2qyrcujwunn3v2'
const outputList = [ output1, output2, output3 ]
const outputListEncoded = outputList.join(outputListDelimiter)
const validPacket = {
  fromKey: { key: shuffler3 },
  message: { str: outputListEncoded }
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
  const inbox = inboxes.get(lastShuffler)
  const gatherFinalOutputPromise = session.gatherFinalOutput({
    attempts,
    timeout,
    lastShuffler,
    receiver
  })
  inbox.add(validPacket)
  const packet = await gatherFinalOutputPromise
  t.deepEqual(packet, validPacket)
})

test('2 attempts', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(shufflers)
  const inboxes = receiver.shufflerInboxes
  const inbox = inboxes.get(lastShuffler)
  const gatherFinalOutputPromise = session.gatherFinalOutput({
    attempts,
    timeout,
    lastShuffler,
    receiver
  })
  inbox.add(invalidPacket)
  inbox.add(validPacket)
  const packet = await gatherFinalOutputPromise
  t.deepEqual(packet, validPacket)
})

test('timeout', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(shufflers)
  const gatherFinalOutputPromise = session.gatherFinalOutput({
    attempts,
    timeout: 0,
    lastShuffler,
    receiver
  })
  try {
    await gatherFinalOutputPromise
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof TimeoutError)
  }
})

test('exhaust', async t => {
  const session = produceSession()
  const receiver = new PhaseReceiver(shufflers)
  const inboxes = receiver.shufflerInboxes
  const inbox = inboxes.get(lastShuffler)
  const gatherFinalOutputPromise = session.gatherFinalOutput({
    attempts,
    timeout,
    lastShuffler,
    receiver
  })
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
