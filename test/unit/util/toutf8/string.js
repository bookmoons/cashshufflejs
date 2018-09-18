import test from 'ava'
import sinon from 'sinon'
import mockRequire from 'mock-require'
import loadDefault from 'helper/loaddef'
const arrayToBytes = sinon.stub()
const byteStringToArray = sinon.stub()
let stringToUtf8

test.before(async t => {
  mockRequire('util/tobytes/array', arrayToBytes)
  mockRequire('util/toarray/bytestring', byteStringToArray)
  stringToUtf8 = await loadDefault('util/toutf8/string')
})

test.beforeEach(t => {
  arrayToBytes.reset()
  byteStringToArray.reset()
})

test.serial('empty', t => {
  const emptyString = ''
  const expectedByteString = ''
  const expectedBytesArray = []
  const expectedBytes = new Uint8Array(0)
  byteStringToArray.returns(expectedBytesArray)
  arrayToBytes.returns(expectedBytes)
  const bytes = stringToUtf8(emptyString)
  t.true(byteStringToArray.calledOnceWith(expectedByteString))
  t.true(arrayToBytes.calledOnceWith(expectedBytesArray))
  t.deepEqual(bytes, expectedBytes)
})

test.serial('ascii', t => {
  const string = 'abc'
  const expectedByteString = 'abc'
  const expectedBytesArray = [ 0x61, 0x62, 0x63 ]
  const expectedBytes = Uint8Array.from([ 0x61, 0x62, 0x63 ])
  byteStringToArray.returns(expectedBytesArray)
  arrayToBytes.returns(expectedBytes)
  const bytes = stringToUtf8(string)
  t.true(byteStringToArray.calledOnceWith(expectedByteString))
  t.true(arrayToBytes.calledOnceWith(expectedBytesArray))
  t.deepEqual(bytes, expectedBytes)
})

test.serial('high char', t => {
  const string = String.fromCodePoint(9829) // '♥'
  const expectedByteString = String.fromCodePoint(0xe2, 0x99, 0xa5)
  const expectedBytesArray = [ 0xe2, 0x99, 0xa5 ]
  const expectedBytes = Uint8Array.from([ 0xe2, 0x99, 0xa5 ])
  byteStringToArray.returns(expectedBytesArray)
  arrayToBytes.returns(expectedBytes)
  const bytes = stringToUtf8(string)
  t.true(byteStringToArray.calledOnceWith(expectedByteString))
  t.true(arrayToBytes.calledOnceWith(expectedBytesArray))
  t.deepEqual(bytes, expectedBytes)
})
