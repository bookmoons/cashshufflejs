import test from 'ava'
import { MissingValueError, ValueError } from 'error'
import Inbox from 'inbox/fifo'
import StoreReceiver from 'receiver/store'
import Receiver from 'receiver/phase/main'
import submit from 'receiver/phase/submit'

const invalidKey = 'Invalid key'
const validKey = 'Valid key'
const shufflers = [ validKey ]

test.before(t => {
  Object.assign(Receiver.prototype, {
    submit
  })
})

test('missing from_key', async t => {
  const inbox = new Inbox()
  const storeReceiver = new StoreReceiver(inbox)
  const receiver = new Receiver(shufflers, storeReceiver)
  const message = {}
  await receiver.submit(message)
  const discarded = inbox.receive()
  const reason = discarded[1]
  t.true(reason instanceof MissingValueError)
  t.is(reason.message, 'from_key')
})

test('missing from_key.key', async t => {
  const inbox = new Inbox()
  const storeReceiver = new StoreReceiver(inbox)
  const receiver = new Receiver(shufflers, storeReceiver)
  const message = { fromKey: {} }
  await receiver.submit(message)
  const discarded = inbox.receive()
  const reason = discarded[1]
  t.true(reason instanceof MissingValueError)
  t.is(reason.message, 'from_key.key')
})

test('unrecognized sender key', async t => {
  const inbox = new Inbox()
  const storeReceiver = new StoreReceiver(inbox)
  const receiver = new Receiver(shufflers, storeReceiver)
  const message = { fromKey: { key: invalidKey } }
  await receiver.submit(message)
  const discarded = inbox.receive()
  const reason = discarded[1]
  t.true(reason instanceof ValueError)
})

test('recognized sender key', async t => {
  const inbox = new Inbox()
  const storeReceiver = new StoreReceiver(inbox)
  const receiver = new Receiver(shufflers, storeReceiver)
  const message = { fromKey: { key: validKey } }
  await receiver.submit(message)
  t.throws(() => {
    inbox.receive()
  })
})
