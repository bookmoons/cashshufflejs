import test from 'ava'
import sinon from 'sinon'
import mockRequire from 'mock-require'
import loadDefault from 'helper/loaddef'
const validateByteString = sinon.stub()
let byteStringToArray

test.before(async t => {
  mockRequire('aid/validate/bytestring', validateByteString)
  byteStringToArray = await loadDefault('aid/toarray/bytestring')
})

test.beforeEach(t => {
  validateByteString.reset()
})

test.serial('invalid', t => {
  const byteString = String.fromCodePoint(888)
  validateByteString.throws()
  t.throws(() => {
    byteStringToArray(byteString)
  })
  t.true(validateByteString.calledOnceWith(byteString))
})

test.serial('empty', t => {
  const bytesArray = byteStringToArray('')
  t.deepEqual(bytesArray, [])
})

test.serial('valid', t => {
  const codePoints = []
  for (let i = 0; i <= 255; i++) codePoints.push(i)
  const byteString = codePoints.reduce(
    function reduceCodePoints (byteString, codePoint) {
      const character = String.fromCodePoint(codePoint)
      byteString += character
      return byteString
    },
    ''
  )
  const bytesArray = byteStringToArray(byteString)
  t.true(validateByteString.calledOnceWith(byteString))
  t.is(bytesArray.length, codePoints.length)
  for (let i = 0; i < bytesArray.length; i++) {
    t.is(bytesArray[i], codePoints[i])
  }
})
