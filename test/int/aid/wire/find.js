import test from 'ava'
import { MissingValueError } from 'error'
import { terminatorByteLength, terminatorBytes } from 'protocol'
import { concatenateBytes } from 'aid/bytes'
import findMessage from 'aid/wire/find'

test('empty', t => {
  const bytes = new Uint8Array(0)
  const error = t.throws(() => {
    findMessage(bytes)
  })
  t.true(error instanceof MissingValueError)
  t.is(error.message, 'delimited message')
})

test('null message', t => {
  const bytes = concatenateBytes([ terminatorBytes ])
  const expectedIndex = terminatorByteLength - 1
  const index = findMessage(bytes)
  t.is(index, expectedIndex)
})

test('1 message', t => {
  const message = Uint8Array.from([ 0xaa, 0xbb, 0xcc ])
  const bytes = concatenateBytes([ message, terminatorBytes ])
  const expectedIndex = message.length + terminatorByteLength - 1
  const index = findMessage(bytes)
  t.is(index, expectedIndex)
})

test('2 messages', t => {
  const message1 = Uint8Array.from([ 0xaa, 0xbb, 0xcc, 0x01, 0x02, 0x03 ])
  const message2 = Uint8Array.from([ 0xdd, 0xee, 0xff ])
  const bytes = concatenateBytes([
    message1, terminatorBytes,
    message2, terminatorBytes
  ])
  const expectedIndex = message1.length + terminatorByteLength - 1
  const index = findMessage(bytes)
  t.is(index, expectedIndex)
})
