import test from 'ava'
import { FormatError } from 'error'
import base64ToBytes from 'aid/convert/base64/bytes'

test('invalid', t => {
  const invalidBase64 = 'aaa}'
  const e = t.throws(() => {
    base64ToBytes(invalidBase64)
  })
  t.true(e instanceof FormatError)
  t.true(e.message.startsWith('invalid base64'))
})

test('bad length', t => {
  const badLengthBase64 = 'ABCDEF'
  const e = t.throws(() => {
    base64ToBytes(badLengthBase64)
  })
  t.true(e instanceof FormatError)
  t.true(e.message.startsWith('invalid base64'))
})

test('valid', t => {
  const validBase64 = 'AQID'
  const expectedBytes = Uint8Array.from([ 1, 2, 3 ])
  const bytes = base64ToBytes(validBase64)
  t.true(bytes instanceof Uint8Array)
  t.deepEqual(bytes, expectedBytes)
})
