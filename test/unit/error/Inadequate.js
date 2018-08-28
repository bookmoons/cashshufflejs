import test from 'ava'
import InadequateError from 'error/Inadequate'

const expectedName = 'InadequateError'
const customMessage = 'Custom error message'

test('name', t => {
  const err = new InadequateError()
  t.is(err.name, expectedName)
})

test('message', t => {
  const err = new InadequateError(customMessage)
  t.is(err.message, customMessage)
})

test('tostring', t => {
  const err = new InadequateError(customMessage)
  const expectedString = expectedName + ': ' + customMessage
  t.is(err.toString(), expectedString)
})
