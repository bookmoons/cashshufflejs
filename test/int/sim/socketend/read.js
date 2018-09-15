import test from 'ava'
import dummyFunction from 'dummy/function'
import SocketEndSimulator from 'sim/socketend/main'
import _read from 'sim/socketend/read'

const testChunk1 = Buffer.from('1234', 'hex')
const testChunk2 = Buffer.from('5678', 'hex')

test.before(t => {
  Object.assign(SocketEndSimulator.prototype, {
    _read
  })
})

test('1 chunk', async t => {
  async function read (size, deliver) {
    deliver(testChunk1)
  }
  const socketEnd = new SocketEndSimulator({
    read,
    write: dummyFunction
  })
  const chunk = socketEnd.read()
  t.deepEqual(chunk, testChunk1)
})

test('2 chunks', async t => {
  async function read (size, deliver) {
    deliver(testChunk1)
    deliver(testChunk2)
  }
  const socketEnd = new SocketEndSimulator({
    read,
    write: dummyFunction
  })
  const chunk = socketEnd.read()
  const expectedChunk = Buffer.concat([ testChunk1, testChunk2 ])
  t.deepEqual(chunk, expectedChunk)
})
