import test from 'ava'
import sinon from 'sinon'
import mockRequire from 'mock-require'
import loadDefault from 'helper/loaddef'
const bytesToArray = sinon.stub()
const fromByteArray = sinon.stub()
let bytesToBase64

test.before(async t => {
  mockRequire('base64-js', { fromByteArray })
  mockRequire('aid/toarray/bytes', bytesToArray)
  bytesToBase64 = await loadDefault('aid/tobase64/bytes')
})

test.beforeEach(t => {
  bytesToArray.reset()
  fromByteArray.reset()
})

test.serial('success', t => {
  const bytes = Uint8Array.from([ 1, 2, 3 ])
  const expectedBytesArray = [ 1, 2, 3 ]
  const expectedBase64 = 'AQID'
  bytesToArray.returns(expectedBytesArray)
  fromByteArray.returns(expectedBase64)
  const base64 = bytesToBase64(bytes)
  t.true(bytesToArray.calledOnceWith(bytes))
  t.true(fromByteArray.calledOnceWith(expectedBytesArray))
  t.is(base64, expectedBase64)
})
