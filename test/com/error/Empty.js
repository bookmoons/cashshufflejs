import test from 'ava'
import EmptyError from 'error/Empty'

const expectedName = 'EmptyError'
const customMessage = 'Custom error message'

test('name', t => {
  const err = new EmptyError()
  t.is(err.name, expectedName)
})

test('message', t => {
  const err = new EmptyError(customMessage)
  t.is(err.message, customMessage)
})

test('tostring', t => {
  const err = new EmptyError(customMessage)
  const expectedString = expectedName + ': ' + customMessage
  t.is(err.toString(), expectedString)
})
