/**
 * Inbox with FIFO delivery order.
 *
 * @module cashshuffle/inbox/fifo
 *
 * @example
import FifoInbox from 'cashshuffle/inbox/fifo'
const inbox = new FifoInbox()

inbox.add('Test message 1')
inbox.add('Test message 2')
inbox.add('Test message 3')
const message1 = inbox.receive()
// message1 === 'Test message 1'
const message2 = inbox.receive()
// message2 === 'Test message 2'
const message3 = inbox.receive()
// message3 === 'Test message 3'
 */

import FifoInbox from './main'
import add from './add'
import receive from './receive'
import watch from './watch'

Object.assign(FifoInbox.prototype, {
  add,
  receive,
  watch
})

Object.freeze(FifoInbox)

export default FifoInbox
