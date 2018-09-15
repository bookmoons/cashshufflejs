import test from 'ava'
import SocketSimulator from 'sim/socket'

const testChunk1 = Buffer.from('1234', 'hex')
const testChunk2 = Buffer.from('5678', 'hex')

test('1 chunk first second', async t => {
  const output = []
  let resolveTransferred
  const transferred = new Promise(resolve => {
    resolveTransferred = resolve
  })
  const socket = new SocketSimulator()
  const first = socket.first
  const second = socket.second
  second.on('data', function handleSecondData (chunk) {
    output.push(chunk)
    resolveTransferred()
  })
  first.write(testChunk1)
  await transferred
  const output1 = output.shift()
  t.deepEqual(output1, testChunk1)
})

test('2 chunks first second', async t => {
  const output = []
  let resolveTransferred
  const transferred = new Promise(resolve => {
    resolveTransferred = resolve
  })
  const socket = new SocketSimulator()
  const first = socket.first
  const second = socket.second
  second.on('data', function handleSecondData (chunk) {
    output.push(chunk)
    if (output.length === 2) resolveTransferred()
  })
  first.write(testChunk1)
  first.write(testChunk2)
  await transferred
  const output1 = output.shift()
  t.deepEqual(output1, testChunk1)
  const output2 = output.shift()
  t.deepEqual(output2, testChunk2)
})

test('1 chunk second first', async t => {
  const output = []
  let resolveTransferred
  const transferred = new Promise(resolve => {
    resolveTransferred = resolve
  })
  const socket = new SocketSimulator()
  const first = socket.first
  const second = socket.second
  first.on('data', function handleFirstData (chunk) {
    output.push(chunk)
    resolveTransferred()
  })
  second.write(testChunk1)
  await transferred
  const output1 = output.shift()
  t.deepEqual(output1, testChunk1)
})

test('2 chunks second first', async t => {
  const output = []
  let resolveTransferred
  const transferred = new Promise(resolve => {
    resolveTransferred = resolve
  })
  const socket = new SocketSimulator()
  const first = socket.first
  const second = socket.second
  first.on('data', function handleFirstData (chunk) {
    output.push(chunk)
    if (output.length === 2) resolveTransferred()
  })
  second.write(testChunk1)
  second.write(testChunk2)
  await transferred
  const output1 = output.shift()
  t.deepEqual(output1, testChunk1)
  const output2 = output.shift()
  t.deepEqual(output2, testChunk2)
})
