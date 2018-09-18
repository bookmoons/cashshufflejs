import test from 'ava'
import { ValueError } from 'error'
import validateByteString from 'util/validate/bytestring'

function verifyNotString (t, error) {
  t.true(error instanceof ValueError)
  t.true(error.message.startsWith('invalid byte string'))
  const cause = error.cause()
  t.true(cause instanceof TypeError)
  t.is(cause.message, 'not string')
}

function verifyOverMax (t, error) {
  t.true(error instanceof ValueError)
  t.true(error.message.startsWith('invalid byte string'))
  const cause = error.cause()
  t.true(cause instanceof RangeError)
  t.is(cause.message, 'code point over 255')
}

test('missing', t => {
  const error = t.throws(() => {
    validateByteString()
  })
  verifyNotString(t, error)
})

test('valid', t => {
  const validCodePoints = []
  for (let i = 0; i <= 255; i++) validCodePoints.push(i)
  const validByteString = validCodePoints.reduce(
    function reduceCodePoint (byteString, codePoint) {
      const character = String.fromCodePoint(codePoint)
      byteString += character
      return byteString
    },
    ''
  )
  t.notThrows(() => {
    validateByteString(validByteString)
  })
})

test('invalid', t => {
  const invalidCodePoint = 888
  const invalidByteString = String.fromCodePoint(invalidCodePoint)
  const error = t.throws(() => {
    validateByteString(invalidByteString)
  })
  verifyOverMax(t, error)
})
