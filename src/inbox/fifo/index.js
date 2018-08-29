/**
 * Inbox with FIFO delivery order.
 *
 * @module cashshuffle/inbox/fifo
 *
 * @example
import Inbox from 'cashshuffle/inbox/fifo'
const inbox = new Inbox()

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

import Inbox from './main'
import add from './add'
import receive from './receive'
import watch from './watch'

Object.assign(Inbox.prototype, {
  add,
  receive,
  watch
})

export default Inbox
