import test from 'ava'
import Inbox from 'inbox/fifo'
import Receiver from 'receiver/store/main'
import submit from 'receiver/store/submit'

const testMessage1 = 'Test message 1'
const testMessage2 = 'Test message 2'

test.before(t => {
  Object.assign(Receiver.prototype, {
    submit
  })
})

test('1 message', async t => {
  const inbox = new Inbox()
  const receiver = new Receiver(inbox)
  await receiver.submit(testMessage1)
  const message = inbox.receive()
  t.is(message, testMessage1)
})

test('2 messages', async t => {
  const inbox = new Inbox()
  const receiver = new Receiver(inbox)
  await receiver.submit(testMessage1)
  await receiver.submit(testMessage2)
  const message1 = inbox.receive()
  t.is(message1, testMessage1)
  const message2 = inbox.receive()
  t.is(message2, testMessage2)
})
