import test from 'ava'
import dummyFunction from 'dummy/function'
import SocketEndSimulator from 'sim/socketend/main'
import _write from 'sim/socketend/write'

const testChunk1 = Buffer.from('1234', 'hex')
const testChunk2 = Buffer.from('5678', 'hex')

test.before(t => {
  Object.assign(SocketEndSimulator.prototype, {
    _write
  })
})

test('1 chunk', async t => {
  const output = []
  let resolveWritten
  const written = new Promise(resolve => {
    resolveWritten = resolve
  })
  async function write (chunk) {
    output.push(chunk)
    resolveWritten()
  }
  const socketEnd = new SocketEndSimulator({
    read: dummyFunction,
    write
  })
  socketEnd.write(testChunk1)
  await written
  const output1 = output.shift()
  t.deepEqual(output1, testChunk1)
})

test('2 chunks', async t => {
  const output = []
  let resolveWritten
  const written = new Promise(resolve => {
    resolveWritten = resolve
  })
  async function write (chunk) {
    output.push(chunk)
    if (output.length === 2) resolveWritten()
  }
  const socketEnd = new SocketEndSimulator({
    readHandler: dummyFunction,
    write
  })
  socketEnd.write(testChunk1)
  socketEnd.write(testChunk2)
  await written
  const output1 = output.shift()
  t.deepEqual(output1, testChunk1)
  const output2 = output.shift()
  t.deepEqual(output2, testChunk2)
})
