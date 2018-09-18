import test from 'ava'
import sinon from 'sinon'
import mockRequire from 'mock-require'
import loadDefault from 'helper/loaddef'
const bytesToByteString = sinon.stub()
const decode = sinon.stub()
let utf8ToString

test.before(async t => {
  mockRequire('util/tobytestring/bytes', bytesToByteString)
  mockRequire('utf8', { decode })
  utf8ToString = await loadDefault('util/tostring/utf8')
})

test.beforeEach(t => {
  bytesToByteString.reset()
  decode.reset()
})

test.serial('empty', t => {
  const emptyBytes = new Uint8Array(0)
  const expectedByteString = ''
  const expectedString = ''
  bytesToByteString.returns(expectedByteString)
  decode.returns(expectedString)
  const string = utf8ToString(emptyBytes)
  t.true(bytesToByteString.calledOnceWith(emptyBytes))
  t.true(decode.calledOnceWith(expectedByteString))
  t.is(string, expectedString)
})

test.serial('ascii', t => {
  const bytes = Uint8Array.from([ 0x61, 0x62, 0x63 ])
  const expectedByteString = 'abc'
  const expectedString = 'abc'
  bytesToByteString.returns(expectedByteString)
  decode.returns(expectedString)
  const string = utf8ToString(bytes)
  t.true(bytesToByteString.calledOnceWith(bytes))
  t.true(decode.calledOnceWith(expectedByteString))
  t.is(string, expectedString)
})

test.serial('high char', t => {
  const bytes = Uint8Array.from([ 0xe2, 0x99, 0xa5 ])
  const expectedByteString = String.fromCodePoint(0xe2, 0x99, 0xa5)
  const expectedString = String.fromCodePoint(9829) // '♥'
  bytesToByteString.returns(expectedByteString)
  decode.returns(expectedString)
  const string = utf8ToString(bytes)
  t.true(bytesToByteString.calledOnceWith(bytes))
  t.true(decode.calledOnceWith(expectedByteString))
  t.is(string, expectedString)
})
