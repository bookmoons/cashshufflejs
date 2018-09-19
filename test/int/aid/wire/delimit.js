import test from 'ava'
import { terminatorBytes } from 'protocol'
import { concatenateBytes } from 'aid/bytes'
import delimitMessage from 'aid/wire/delimit'

test('empty', t => {
  const message = new Uint8Array(0)
  const expected = new Uint8Array(terminatorBytes)
  const delimitedMessage = delimitMessage(message)
  t.deepEqual(delimitedMessage, expected)
})

test('1 byte', t => {
  const message = Uint8Array.from([ 0x01 ])
  const expected = concatenateBytes([ message, terminatorBytes ])
  const delimitedMessage = delimitMessage(message)
  t.deepEqual(delimitedMessage, expected)
})

test('3 bytes', t => {
  const message = Uint8Array.from([ 0x01, 0x02, 0x03 ])
  const expected = concatenateBytes([ message, terminatorBytes ])
  const delimitedMessage = delimitMessage(message)
  t.deepEqual(delimitedMessage, expected)
})
