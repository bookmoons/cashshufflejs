import test from 'ava'
import FeatureMissingError from 'error/FeatureMissing'

const expectedName = 'FeatureMissingError'
const customMessage = 'Custom error message'

test('name', t => {
  const err = new FeatureMissingError()
  t.is(err.name, expectedName)
})

test('message', t => {
  const err = new FeatureMissingError(customMessage)
  t.is(err.message, customMessage)
})

test('tostring', t => {
  const err = new FeatureMissingError(customMessage)
  const expectedString = expectedName + ': ' + customMessage
  t.is(err.toString(), expectedString)
})
