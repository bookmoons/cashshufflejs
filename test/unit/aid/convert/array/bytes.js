import test from 'ava'
import sinon from 'sinon'
import mockRequire from 'mock-require'
import loadDefault from 'helper/loaddef'
const validateByte = sinon.stub()
let arrayToBytes

test.before(async t => {
  mockRequire('aid/validate/byte', validateByte)
  arrayToBytes = await loadDefault('aid/convert/array/bytes')
})

test.beforeEach(t => {
  validateByte.reset()
})

test.serial('invalid', t => {
  validateByte.throws()
  const array = [ 'string' ]
  t.throws(() => {
    arrayToBytes(array)
  })
})

test.serial('valid', t => {
  const array = []
  for (let i = 0; i <= 255; i++) array[i] = i
  const bytes = arrayToBytes(array)
  t.is(bytes.byteLength, array.length)
  for (let i = 0; i < array.length; i++) {
    t.is(bytes[i], array[i])
  }
})
