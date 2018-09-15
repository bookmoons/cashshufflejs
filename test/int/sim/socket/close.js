import test from 'ava'
import SocketSimulator from 'sim/socket'

const testChunk = Buffer.from('1234', 'hex')

test('first', async t => {
  const socket = new SocketSimulator()
  const first = socket.first
  await socket.close()
  t.throws(() => {
    first.write(testChunk)
  })
})

test('second', async t => {
  const socket = new SocketSimulator()
  const second = socket.second
  await socket.close()
  t.throws(() => {
    second.write(testChunk)
  })
})
