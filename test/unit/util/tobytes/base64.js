import test from 'ava'
import sinon from 'sinon'
import { FormatError } from 'error'
import mockRequire from 'mock-require'
import loadDefault from 'helper/loaddef'
const toByteArray = sinon.stub()
const validateBase64 = sinon.stub()
const arrayToBytes = sinon.stub()
let base64ToBytes

test.before(async t => {
  mockRequire('base64-js', { toByteArray })
  mockRequire('util/validate/base64', validateBase64)
  mockRequire('util/tobytes/array', arrayToBytes)
  base64ToBytes = await loadDefault('util/tobytes/base64')
})

test.beforeEach(t => {
  toByteArray.reset()
  validateBase64.reset()
  arrayToBytes.reset()
})

test.serial('invalid', t => {
  const invalidBase64 = 'aaa}'
  validateBase64.throws()
  t.throws(() => {
    base64ToBytes(invalidBase64)
  })
  t.true(validateBase64.calledOnceWith(invalidBase64))
})

test.serial('bad length', t => {
  const badLengthBase64 = 'ABCDEF'
  const invalidLengthMessage = 'Invalid string. Length must be a multiple of 4'
  toByteArray.throws(new Error(invalidLengthMessage))
  const e = t.throws(() => {
    base64ToBytes(badLengthBase64)
  })
  t.true(validateBase64.calledOnceWith(badLengthBase64))
  t.true(e instanceof FormatError)
  t.true(e.message.startsWith('invalid base64'))
})

test.serial('valid', t => {
  const validBase64 = 'AQID' // Bytes: 0x01 0x02 0x03
  const expectedBytesArray = [ 1, 2, 3 ]
  const expectedBytes = Uint8Array.from([ 1, 2, 3 ])
  toByteArray.returns(expectedBytesArray)
  arrayToBytes.returns(expectedBytes)
  const bytes = base64ToBytes(validBase64)
  t.true(validateBase64.calledOnceWith(validBase64))
  t.true(arrayToBytes.calledOnceWith(expectedBytesArray))
  t.true(bytes instanceof Uint8Array)
  t.deepEqual(bytes, expectedBytes)
})
