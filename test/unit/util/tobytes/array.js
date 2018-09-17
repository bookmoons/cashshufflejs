import test from 'ava'
import mockRequire from 'mock-require'
import sinon from 'sinon'
import loadDefault from 'helper/loaddef'
const validateByte = sinon.stub()
let arrayToBytes

test.before(async t => {
  mockRequire('util/validate/byte', validateByte)
  arrayToBytes = await loadDefault('util/tobytes/array')
})

test.serial('invalid', t => {
  validateByte.reset()
  validateByte.throws()
  const array = [ 'string' ]
  t.throws(() => {
    arrayToBytes(array)
  })
})

test.serial('valid', t => {
  validateByte.reset()
  const array = []
  for (let i = 0; i <= 255; i++) array[i] = i
  const bytes = arrayToBytes(array)
  t.is(bytes.byteLength, array.length)
  for (let i = 0; i < array.length; i++) {
    t.is(bytes[i], array[i])
  }
})
