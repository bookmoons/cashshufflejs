import test from 'ava'
import { MissingValueError } from 'error'
import validateShuffleOutput from 'session/validate/shuffleout'

const dummyMessage = { str: 'Dummy str' }
const dummyToKey = { key: 'Dummy key' }
const output =
  'A/Cee7rwlmmxzeM5TbC3LDQI7Qgm+Y15haPOzBSGB1071Zs6T8FR5uuJCTBrBJnGxqv4' +
  'ii6cXLpkVyrcKsK+epO9J6F9V0qkt1Ic0OR32Be5W2ddGr13HQIFS+RltmeACikqq120' +
  'b7GRgFTnvTTuZs8AVKH/AqCvqt5NqT1fiIqW+TEuzvLAd0Y5ABWkG50HIA=='

test('missing to_key', async t => {
  const packet = { message: dummyMessage }
  try {
    await validateShuffleOutput(packet)
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'to_key')
  }
})

test('missing to_key.key', async t => {
  const packet = { toKey: {}, message: dummyMessage }
  try {
    await validateShuffleOutput(packet)
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'to_key.key')
  }
})

test('missing message', async t => {
  const packet = { toKey: dummyToKey }
  try {
    await validateShuffleOutput(packet)
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'message')
  }
})

test('missing message.str', async t => {
  const packet = { toKey: dummyToKey, message: {} }
  try {
    await validateShuffleOutput(packet)
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'message.str')
  }
})

test('valid', async t => {
  const packet = { toKey: dummyToKey, message: { str: output } }
  await t.notThrowsAsync(async () => {
    await validateShuffleOutput(packet)
  })
})
