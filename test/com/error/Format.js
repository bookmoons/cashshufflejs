import test from 'ava'
import FormatError from 'error/Format'

const expectedName = 'FormatError'
const customMessage = 'Custom error message'

test('name', t => {
  const err = new FormatError()
  t.is(err.name, expectedName)
})

test('message', t => {
  const err = new FormatError(customMessage)
  t.is(err.message, customMessage)
})

test('tostring', t => {
  const err = new FormatError(customMessage)
  const expectedString = expectedName + ': ' + customMessage
  t.is(err.toString(), expectedString)
})
