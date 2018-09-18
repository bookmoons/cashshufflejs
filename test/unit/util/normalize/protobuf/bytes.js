import test from 'ava'
import sinon from 'sinon'
import mockRequire from 'mock-require'
import loadDefault from 'helper/loaddef'
const arrayToBytes = sinon.stub()
let normalizeProtobufBytes

test.before(async t => {
  mockRequire('util/tobytes/array', arrayToBytes)
  normalizeProtobufBytes = await loadDefault('util/normalize/protobuf/bytes')
})

test.beforeEach(t => {
  arrayToBytes.reset()
})

test.serial('typedarray', t => {
  const denormalBytes = Uint8Array.from([ 0x08, 0x09, 0x0a ])
  const expectedBytesArray = [ 0x08, 0x09, 0x0a ]
  const expectedBytes = Uint8Array.from([ 0x08, 0x09, 0x0a ])
  arrayToBytes.returns(expectedBytes)
  const bytes = normalizeProtobufBytes(denormalBytes)
  t.true(arrayToBytes.calledOnceWith(expectedBytesArray))
  t.deepEqual(bytes, expectedBytes)
})

test.serial('node buffer', t => {
  const denormalBytes = Buffer.from([ 0x08, 0x09, 0x0a ])
  const expectedBytesArray = [ 0x08, 0x09, 0x0a ]
  const expectedBytes = Uint8Array.from([ 0x08, 0x09, 0x0a ])
  arrayToBytes.returns(expectedBytes)
  const bytes = normalizeProtobufBytes(denormalBytes)
  t.true(arrayToBytes.calledOnceWith(expectedBytesArray))
  t.deepEqual(bytes, expectedBytes)
})

test.serial('array', t => {
  const denormalBytes = [ 0x08, 0x09, 0x0a ]
  const expectedBytesArray = [ 0x08, 0x09, 0x0a ]
  const expectedBytes = Uint8Array.from([ 0x08, 0x09, 0x0a ])
  arrayToBytes.returns(expectedBytes)
  const bytes = normalizeProtobufBytes(denormalBytes)
  t.true(arrayToBytes.calledOnceWith(expectedBytesArray))
  t.deepEqual(bytes, expectedBytes)
})
