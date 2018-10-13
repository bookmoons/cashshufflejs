import test from 'ava'
import { ValueError } from 'error'
import { terminatorNodeBuffer } from 'protocol'
import undelimit from 'sim/server/session/undelimit'

const testMessage1 = Buffer.from([ 0x01, 0x02, 0x03 ])
const testMessage2 = Buffer.from([ 0x04, 0x05, 0x06 ])
const emptyData = Buffer.alloc(0)
const noMessageData = Buffer.from([ 0x01 ])
const emptyMessageData = Buffer.concat([ terminatorNodeBuffer ])
const oneMessageData = Buffer.concat([ testMessage1, terminatorNodeBuffer ])
const twoMessagesData = Buffer.concat([
  testMessage1, terminatorNodeBuffer,
  testMessage2, terminatorNodeBuffer
])

test('empty data', t => {
  try {
    undelimit(emptyData)
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof ValueError)
    t.is(e.message, 'no delimited message')
  }
})

test('no message', t => {
  try {
    undelimit(noMessageData)
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof ValueError)
    t.is(e.message, 'no delimited message')
  }
})

test('empty message', t => {
  const [ message ] = undelimit(emptyMessageData)
  t.is(message.length, 0)
})

test('1 message', t => {
  const [ message, newData ] = undelimit(oneMessageData)
  t.deepEqual(message, testMessage1)
  t.throws(() => {
    undelimit(newData)
  })
})

test('2 messages', t => {
  const [ message1, newData1 ] = undelimit(twoMessagesData)
  t.deepEqual(message1, testMessage1)
  const [ message2, newData2 ] = undelimit(newData1)
  t.deepEqual(message2, testMessage2)
  t.throws(() => {
    undelimit(newData2)
  })
})
