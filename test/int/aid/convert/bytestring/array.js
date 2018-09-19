import test from 'ava'
import { FormatError } from 'error'
import { byteToByteString } from 'aid/reduce'
import byteStringToArray from 'aid/convert/bytestring/array'

test('invalid', t => {
  const byteString = String.fromCodePoint(888)
  const error = t.throws(() => {
    byteStringToArray(byteString)
  })
  t.true(error instanceof FormatError)
  t.true(error.message.startsWith('invalid byte string'))
})

test('empty', t => {
  const bytesArray = byteStringToArray('')
  t.deepEqual(bytesArray, [])
})

test('valid', t => {
  const codePoints = []
  for (let i = 0; i <= 255; i++) codePoints.push(i)
  const byteString = codePoints.reduce(byteToByteString, '')
  const bytesArray = byteStringToArray(byteString)
  t.is(bytesArray.length, codePoints.length)
  for (let i = 0; i < bytesArray.length; i++) {
    t.is(bytesArray[i], codePoints[i])
  }
})
