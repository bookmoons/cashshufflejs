import test from 'ava'
import CashShuffleError from 'error/CashShuffle'

const expectedName = 'CashShuffleError'
const customMessage = 'Custom error message'

test('name', t => {
  const err = new CashShuffleError()
  t.is(err.name, expectedName)
})

test('message', t => {
  const err = new CashShuffleError(customMessage)
  t.is(err.message, customMessage)
})

test('tostring', t => {
  const err = new CashShuffleError(customMessage)
  const expectedString = expectedName + ': ' + customMessage
  t.is(err.toString(), expectedString)
})
