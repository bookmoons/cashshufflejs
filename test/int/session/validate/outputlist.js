import test from 'ava'
import { MissingValueError } from 'error'
import { outputListDelimiter } from 'session/value'
import validateOutputList from 'session/validate/outputlist'

const dummyMessage = { str: 'Dummy string' }
const dummyToKey = { key: 'Dummy key' }
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

test('missing to_key', async t => {
  const packet = { message: dummyMessage }
  try {
    await validateOutputList(packet)
    t.fail('Incorrect successful validation')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'to_key')
  }
})

test('missing to_key.key', async t => {
  const packet = { toKey: {}, message: dummyMessage }
  try {
    await validateOutputList(packet)
    t.fail('Incorrect successful validation')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'to_key.key')
  }
})

test('missing message', async t => {
  const packet = { toKey: dummyToKey }
  try {
    await validateOutputList(packet)
    t.fail('Incorrect successful validation')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'message')
  }
})

test('missing message.str', async t => {
  const packet = { toKey: dummyToKey, message: {} }
  try {
    await validateOutputList(packet)
    t.fail('Incorrect successful validation')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'message.str')
  }
})

test('valid', async t => {
  const packet = { toKey: dummyToKey, message: { str: outputListEncoded } }
  await t.notThrowsAsync(async () => {
    await validateOutputList(packet)
  })
})
