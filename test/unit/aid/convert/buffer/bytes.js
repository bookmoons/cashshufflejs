import test from 'ava'
import sinon from 'sinon'
import mockRequire from 'mock-require'
import loadDefault from 'helper/loaddef'
const copyBuffer = sinon.stub()
let bufferToBytes

test.before(async t => {
  mockRequire('aid/buffer/copy', copyBuffer)
  bufferToBytes = await loadDefault('aid/convert/buffer/bytes')
})

test.beforeEach(t => {
  copyBuffer.reset()
})

test('success', t => {
  const buffer = Uint8Array.from([ 0x08, 0x09, 0x0a ]).buffer
  const bufferCopy = buffer.slice(0)
  const expectedBytes = Uint8Array.from([ 0x08, 0x09, 0x0a ])
  copyBuffer.returns(bufferCopy)
  const bytes = bufferToBytes(buffer)
  t.true(copyBuffer.calledOnceWith(buffer))
  t.deepEqual(bytes, expectedBytes)
})
