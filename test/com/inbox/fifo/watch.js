import test from 'ava'
import Inbox from 'inbox/fifo/main'
import add from 'inbox/fifo/add'
import watch from 'inbox/fifo/watch'

const testMessage1 = 'Test message 1'
const testMessage2 = 'Test message 2'
const timeout = 500

test.before(t => {
  Object.assign(Inbox.prototype, {
    add,
    watch
  })
})

test('timeout', async t => {
  const inbox = new Inbox()
  await t.throwsAsync(async () => {
    await inbox.watch(0)
  })
})

test('nonempty', async t => {
  const inbox = new Inbox()
  inbox.add(testMessage1)
  const message = await inbox.watch(timeout)
  t.is(message, testMessage1)
})

test('wait', async t => {
  const inbox = new Inbox()
  const messagePromise = inbox.watch(timeout)
  inbox.add(testMessage1)
  const message = await messagePromise
  t.is(message, testMessage1)
})

test('2 messages', async t => {
  const inbox = new Inbox()
  inbox.add(testMessage1)
  inbox.add(testMessage2)
  const message1 = await inbox.watch(timeout)
  t.is(message1, testMessage1)
  const message2 = await inbox.watch(timeout)
  t.is(message2, testMessage2)
})

test('wait after watch', async t => {
  const inbox = new Inbox()
  inbox.add(testMessage1)
  const message1 = await inbox.watch(timeout)
  t.is(message1, testMessage1)
  const message2Promise = inbox.watch(timeout)
  inbox.add(testMessage2)
  const message2 = await message2Promise
  t.is(message2, testMessage2)
})
