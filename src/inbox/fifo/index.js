/**
 * Inbox with FIFO delivery order.
 *
 * @module cashshuffle/inbox/fifo
 *
 * @example
import Inbox from 'cashshuffle/inbox/fifo'
const inbox = new Inbox()

inbox.add('Test message')
const message = inbox.receive()
// message == 'Test message'
 */

import Inbox from './main'
import add from './add'

Object.assign(Inbox.prototype, {
  add
})

export default Inbox
