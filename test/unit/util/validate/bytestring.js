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
  const codePoints = []
  for (let i = 0; i <= 255; i++) codePoints.push(i)
  const byteString = codePoints.reduce(
    function reduceCodePoint (byteString, codePoint) {
      const character = String.fromCodePoint(codePoint)
      byteString += character
      return byteString
    },
    ''
  )
  t.notThrows(() => {
    validateByteString(byteString)
  })
})

test('invalid', t => {
  const byteString = String.fromCodePoint(888)
  const error = t.throws(() => {
    validateByteString(byteString)
  })
  verifyOverMax(t, error)
})
