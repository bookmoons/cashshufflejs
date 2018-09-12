import test from 'ava'
import Inbox from 'inbox/base'
import FifoInbox from 'inbox/fifo'

test('subclass', t => {
  const inbox = new FifoInbox()
  t.true(inbox instanceof Inbox)
})
