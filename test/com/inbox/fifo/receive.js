import test from 'ava'
import FifoInbox from 'inbox/fifo/main'
import add from 'inbox/fifo/add'
import receive from 'inbox/fifo/receive'

const message1 = 'Test message 1'
const message2 = 'Test message 2'
const message3 = 'Test message 3'

test.before(t => {
  Object.assign(FifoInbox.prototype, {
    add,
    receive
  })
})

test('empty', t => {
  const inbox = new FifoInbox()
  t.throws(() => {
    inbox.receive()
  })
})

test('emptied', t => {
  const inbox = new FifoInbox()
  inbox.add(message1)
  inbox.add(message2)
  inbox.receive()
  inbox.receive()
  t.throws(() => {
    inbox.receive()
  })
})

test('1 message', t => {
  const inbox = new FifoInbox()
  inbox.add(message1)
  const message = inbox.receive()
  t.is(message, message1)
})

test('2 messages', t => {
  const inbox = new FifoInbox()
  inbox.add(message1)
  inbox.add(message2)
  t.is(inbox.receive(), message1)
  t.is(inbox.receive(), message2)
})

test('add after receive', t => {
  const inbox = new FifoInbox()
  inbox.add(message1)
  inbox.add(message2)
  t.is(inbox.receive(), message1)
  inbox.add(message3)
  t.is(inbox.receive(), message2)
  t.is(inbox.receive(), message3)
  t.throws(() => {
    inbox.receive()
  })
})
