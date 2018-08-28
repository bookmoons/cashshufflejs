import test from 'ava'
import ValueError from 'error/Value'

const expectedName = 'ValueError'
const customMessage = 'Custom error message'

test('name', t => {
  const err = new ValueError()
  t.is(err.name, expectedName)
})

test('message', t => {
  const err = new ValueError(customMessage)
  t.is(err.message, customMessage)
})

test('tostring', t => {
  const err = new ValueError(customMessage)
  const expectedString = expectedName + ': ' + customMessage
  t.is(err.toString(), expectedString)
})
