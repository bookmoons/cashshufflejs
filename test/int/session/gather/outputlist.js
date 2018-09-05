import test from 'ava'
import { ExhaustionError, TimeoutError } from 'error'
import PhaseReceiver from 'receiver/phase'
import { outputListDelimiter } from 'session/value'
import validateOutputList from 'session/validate/outputlist'
import gatherOutputList from 'session/gather/outputlist'

const attempts = 2
const timeout = 500
const participant1 =
  '03a8213dda332b827cf54c49ac9b3ad4566c293b5da40e7eea5e07c77fe0d5b32e'
const participant2 =
  '03b726b7920ec51a575696b368be5470142434124ade29bcee744ae248365ee3b4'
const participant3 =
  '036da9c411c438138a73224ebe382f4bfad63d496cf611e91da375d1ebb343ad43'
const participants = [ participant1, participant2, participant3 ]
const output1 =
  'A/Cee7rwlmmxzeM5TbC3LDQI7Qgm+Y15haPOzBSGB1071Zs6T8FR5uuJCTBrBJnGxqv4' +
  'ii6cXLpkVyrcKsK+epO9J6F9V0qkt1Ic0OR32Be5W2ddGr13HQIFS+RltmeACikqq120' +
  'b7GRgFTnvTTuZs8AVKH/AqCvqt5NqT1fiIqW+TEuzvLAd0Y5ABWkG50HIA=='
const output2 =
  'A/Cee7rwlmmxzeM5TbC3LDQI7Qgm+Y15haPOzBSGB107Z9OOF3YyMTsWxBtMOA2Z8OJ+' +
  'EGaJuaoyTQEH8VTwy3ZXvBNbDGY9FTBEpexYbOleNW1dUl6mVkTXOVd9Inf2Vdy3HD4L' +
  'SirOU6qgW01YiBRx6lO3raZrP+mQxTiceI1YehOw56r1rgT6ELISZzpRtQ=='
const output3 =
  'A/Cee7rwlmmxzeM5TbC3LDQI7Qgm+Y15haPOzBSGB107BjuQFdYqp/UyxdPXj/QodR30' +
  'vfU9ZmNaSnmArDetI+n4RLoIYro5IJ53VqEvBjFgjgaAUOTICl2I/iecVrnxkkAVYHnG' +
  'UvPIwKZ2BpfWElKOD7fbBUAo8Bq9mdslv2ckDcTmntKKfPbsNy4TqfMR8g=='
const outputList = [ output1, output2, output3 ]
const outputListEncoded = outputList.join(outputListDelimiter)
const validPacket = {
  fromKey: { key: participant1 },
  toKey: { key: participant2 },
  message: { str: outputListEncoded }
}
const invalidPacket = {}

test('1 attempt', async t => {
  const session = {
    gatherOutputList,
    validateOutputList
  }
  const receiver = new PhaseReceiver(participants)
  const inboxes = receiver.participantInboxes
  const inbox = inboxes.get(participant1)
  const gatherOutputListPromise = session.gatherOutputList({
    attempts,
    timeout,
    signingPublicKey: participant2,
    priorParticipant: participant1,
    receiver
  })
  inbox.add(validPacket)
  const packet = await gatherOutputListPromise
  t.deepEqual(packet, validPacket)
})

test('2 attempts', async t => {
  const session = {
    gatherOutputList,
    validateOutputList
  }
  const receiver = new PhaseReceiver(participants)
  const inboxes = receiver.participantInboxes
  const inbox = inboxes.get(participant1)
  const gatherOutputListPromise = session.gatherOutputList({
    attempts,
    timeout,
    signingPublicKey: participant2,
    priorParticipant: participant1,
    receiver
  })
  inbox.add(invalidPacket)
  inbox.add(validPacket)
  const packet = await gatherOutputListPromise
  t.deepEqual(packet, validPacket)
})

test('timeout', async t => {
  const session = {
    gatherOutputList,
    validateOutputList
  }
  const receiver = new PhaseReceiver(participants)
  const gatherOutputListPromise = session.gatherOutputList({
    attempts,
    timeout: 0,
    signingPublicKey: participant2,
    priorParticipant: participant1,
    receiver
  })
  try {
    await gatherOutputListPromise
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof TimeoutError)
  }
})

test('exhaust', async t => {
  const session = {
    gatherOutputList,
    validateOutputList
  }
  const receiver = new PhaseReceiver(participants)
  const inboxes = receiver.participantInboxes
  const inbox = inboxes.get(participant1)
  const gatherOutputListPromise = session.gatherOutputList({
    attempts,
    timeout,
    signingPublicKey: participant2,
    priorParticipant: participant1,
    receiver
  })
  inbox.add(invalidPacket)
  inbox.add(invalidPacket)
  try {
    await gatherOutputListPromise
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof ExhaustionError)
    t.is(e.message, 'max attempts')
  }
})
