import test from 'ava'
import { FormatError } from 'error'
import { terminatorBytes } from 'protocol'
import { concatenateBytes, copyBytes } from 'aid/bytes'
import undelimitMessage from 'aid/wire/undelimit'

const errorMessage = 'invalid delimited wire message'

test('empty', t => {
  const delimitedMessage = new Uint8Array(0)
  const error = t.throws(() => {
    undelimitMessage(delimitedMessage)
  })
  t.true(error instanceof FormatError)
  t.true(error.message.startsWith(errorMessage))
  const cause = error.cause()
  t.true(cause instanceof FormatError)
  t.is(cause.message, 'shorter than delimiter')
})

test('short', t => {
  const delimitedMessage = Uint8Array.from([ 0x01 ])
  const error = t.throws(() => {
    undelimitMessage(delimitedMessage)
  })
  t.true(error instanceof FormatError)
  t.true(error.message.startsWith(errorMessage))
  const cause = error.cause()
  t.true(cause instanceof FormatError)
  t.is(cause.message, 'shorter than delimiter')
})

test('bad delimiter', t => {
  const delimitedMessage = Uint8Array.from([ 0x01, 0x02, 0x03 ])
  const error = t.throws(() => {
    undelimitMessage(delimitedMessage)
  })
  t.true(error instanceof FormatError)
  t.true(error.message.startsWith(errorMessage))
  const cause = error.cause()
  t.true(cause instanceof FormatError)
  t.is(cause.message, 'invalid terminator')
})

test('null message', t => {
  const delimitedMessage = copyBytes(terminatorBytes)
  const message = undelimitMessage(delimitedMessage)
  t.is(message.length, 0)
})

test('1 byte message', t => {
  const remoteMessage = Uint8Array.from([ 0x01 ])
  const delimitedMessage = concatenateBytes([ remoteMessage, terminatorBytes ])
  const message = undelimitMessage(delimitedMessage)
  t.deepEqual(message, remoteMessage)
})

test('3 byte message', t => {
  const remoteMessage = Uint8Array.from([ 0x01, 0x02, 0x03 ])
  const delimitedMessage = concatenateBytes([ remoteMessage, terminatorBytes ])
  const message = undelimitMessage(delimitedMessage)
  t.deepEqual(message, remoteMessage)
})
