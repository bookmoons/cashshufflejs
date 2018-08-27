import test from 'ava'
import ExhaustionError from 'error/Exhaustion'

const expectedName = 'ExhaustionError'
const customMessage = 'Custom error message'

test('name', t => {
  const err = new ExhaustionError()
  t.is(err.name, expectedName)
})

test('message', t => {
  const err = new ExhaustionError(customMessage)
  t.is(err.message, customMessage)
})

test('tostring', t => {
  const err = new ExhaustionError(customMessage)
  const expectedString = expectedName + ': ' + customMessage
  t.is(err.toString(), expectedString)
})
