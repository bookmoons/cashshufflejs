import test from 'ava'
import { MissingValueError } from 'error'
import validateFinalOutput from 'session/validate/finalout'

const dummyMessage = { str: 'Dummy str' }
const dummyToKey = { key: 'Dummy key' }
const outputAddress = 'bitcoincash:qrqpqsvcy94qfm3a8px0sxr5lmm825u3wv3l8fd6xf'

test('missing message', async t => {
  const packet = { toKey: dummyToKey }
  try {
    await validateFinalOutput(packet)
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'message')
  }
})

test('missing message.str', async t => {
  const packet = { toKey: dummyToKey, message: {} }
  try {
    await validateFinalOutput(packet)
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'message.str')
  }
})

test('valid', async t => {
  const packet = { toKey: dummyToKey, message: { str: outputAddress } }
  await t.notThrowsAsync(async () => {
    await validateFinalOutput(packet)
  })
})
