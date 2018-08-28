import test from 'ava'
import BusyError from 'error/Busy'

const expectedName = 'BusyError'
const customMessage = 'Custom error message'

test('name', t => {
  const err = new BusyError()
  t.is(err.name, expectedName)
})

test('message', t => {
  const err = new BusyError(customMessage)
  t.is(err.message, customMessage)
})

test('tostring', t => {
  const err = new BusyError(customMessage)
  const expectedString = expectedName + ': ' + customMessage
  t.is(err.toString(), expectedString)
})
