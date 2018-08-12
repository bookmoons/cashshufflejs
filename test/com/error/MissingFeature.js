import test from 'ava'
import MissingFeatureError from 'error/MissingFeature'

const expectedName = 'MissingFeatureError'
const customMessage = 'Custom error message'

test('name', t => {
  const err = new MissingFeatureError()
  t.is(err.name, expectedName)
})

test('message', t => {
  const err = new MissingFeatureError(customMessage)
  t.is(err.message, customMessage)
})

test('tostring', t => {
  const err = new MissingFeatureError(customMessage)
  const expectedString = expectedName + ': ' + customMessage
  t.is(err.toString(), expectedString)
})
