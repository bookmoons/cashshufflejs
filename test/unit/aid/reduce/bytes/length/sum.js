import test from 'ava'
import bytesToLengthSum from 'aid/reduce/bytes/length/sum'

test('empty', t => {
  const bytesList = []
  const length = bytesList.reduce(bytesToLengthSum, 0)
  t.is(length, 0)
})

test('single 0', t => {
  const bytesList = [ new Uint8Array(0) ]
  const length = bytesList.reduce(bytesToLengthSum, 0)
  t.is(length, 0)
})

test('all 0', t => {
  const bytesList = [
    new Uint8Array(0),
    new Uint8Array(0),
    new Uint8Array(0)
  ]
  const length = bytesList.reduce(bytesToLengthSum, 0)
  t.is(length, 0)
})

test('some 0', t => {
  const bytesList = [
    new Uint8Array(0),
    new Uint8Array(27),
    new Uint8Array(0)
  ]
  const length = bytesList.reduce(bytesToLengthSum, 0)
  t.is(length, 27)
})

test('single', t => {
  const bytesList = [ new Uint8Array(10) ]
  const length = bytesList.reduce(bytesToLengthSum, 0)
  t.is(length, 10)
})

test('multiple', t => {
  const bytesList = [
    new Uint8Array(5),
    new Uint8Array(5),
    new Uint8Array(5)
  ]
  const length = bytesList.reduce(bytesToLengthSum, 0)
  t.is(length, 15)
})
