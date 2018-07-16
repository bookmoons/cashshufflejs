import test from 'ava'
import NotImplementedError from 'error/NotImplemented'

const expectedName = 'NotImplementedError'
const customMessage = 'Custom error message'

test('name', t => {
  const err = new NotImplementedError()
  t.is(err.name, expectedName)
})

test('message', t => {
  const err = new NotImplementedError(customMessage)
  t.is(err.message, customMessage)
})

test('tostring', t => {
  const err = new NotImplementedError(customMessage)
  const expectedString = expectedName + ': ' + customMessage
  t.is(err.toString(), expectedString)
})
