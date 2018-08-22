import test from 'ava'
import privs from 'inbox/fifo/privs'
import Inbox from 'inbox/fifo/main'
import add from 'inbox/fifo/add'

const message1 = 'Test message 1'
const message2 = 'Test message 2'

test.before(t => {
  Object.assign(Inbox.prototype, {
    add
  })
})

test('1 message', t => {
  const inbox = new Inbox()
  inbox.add(message1)
  const priv = privs.get(inbox)
  t.is(priv.messages[0], message1)
})

test('2 messages', t => {
  const inbox = new Inbox()
  inbox.add(message1)
  inbox.add(message2)
  const priv = privs.get(inbox)
  t.is(priv.messages[0], message1)
  t.is(priv.messages[1], message2)
})
