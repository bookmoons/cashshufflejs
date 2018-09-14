import test from 'ava'
import UnavailableError from 'error/Unavailable'

const expectedName = 'UnavailableError'
const customMessage = 'Custom error message'

test('name', t => {
  const err = new UnavailableError()
  t.is(err.name, expectedName)
})

test('message', t => {
  const err = new UnavailableError(customMessage)
  t.is(err.message, customMessage)
})

test('tostring', t => {
  const err = new UnavailableError(customMessage)
  const expectedString = expectedName + ': ' + customMessage
  t.is(err.toString(), expectedString)
})
