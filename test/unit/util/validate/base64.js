import test from 'ava'
import { FormatError } from 'error'
import validateBase64 from 'util/validate/base64'

const testEmpty = ''
const testValidUnpadded = 'AQID'
const testValidPadded = 'AQIDBA=='
const testInvalidAscii = 'aaa}'
const testInvalidUnicode = 'aaaä'

test('empty', t => {
  t.notThrows(() => {
    validateBase64(testEmpty)
  })
})

test('valid unpadded', t => {
  t.notThrows(() => {
    validateBase64(testValidUnpadded)
  })
})

test('valid padded', t => {
  t.notThrows(() => {
    validateBase64(testValidPadded)
  })
})

test('invalid ascii', t => {
  const e = t.throws(() => {
    validateBase64(testInvalidAscii)
  })
  t.true(e instanceof FormatError)
  t.is(e.message, 'invalid base64')
})

test('invalid unicode', t => {
  const e = t.throws(() => {
    validateBase64(testInvalidUnicode)
  })
  t.true(e instanceof FormatError)
  t.is(e.message, 'invalid base64')
})
