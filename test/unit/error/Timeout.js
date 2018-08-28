import test from 'ava'
import TimeoutError from 'error/Timeout'

const expectedName = 'TimeoutError'
const customMessage = 'Custom error message'

test('name', t => {
  const err = new TimeoutError()
  t.is(err.name, expectedName)
})

test('message', t => {
  const err = new TimeoutError(customMessage)
  t.is(err.message, customMessage)
})

test('tostring', t => {
  const err = new TimeoutError(customMessage)
  const expectedString = expectedName + ': ' + customMessage
  t.is(err.toString(), expectedString)
})
