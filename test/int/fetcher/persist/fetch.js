import test from 'ava'
import { ExhaustionError, TimeoutError } from 'error'
import FifoInbox from 'inbox/fifo'
import PersistFetcher from 'fetcher/persist/main'
import fetch from 'fetcher/persist/fetch'

const attempts = 2
const timeout = 500
const validMessage = 'Valid message'
const invalidMessage = 'Invalid message'
function evaluator (message) { return (message === validMessage) }

test.before(t => {
  Object.assign(PersistFetcher.prototype, {
    fetch
  })
})

test('1 attempt', async t => {
  const inbox = new FifoInbox()
  inbox.add(validMessage)
  const fetcher = new PersistFetcher(inbox, evaluator, attempts)
  const message = await fetcher.fetch(timeout)
  t.is(message, validMessage)
})

test('2 attempts', async t => {
  const inbox = new FifoInbox()
  inbox.add(invalidMessage)
  inbox.add(validMessage)
  const fetcher = new PersistFetcher(inbox, evaluator, attempts)
  const message = await fetcher.fetch(timeout)
  t.is(message, validMessage)
})

test('exhaust', async t => {
  const inbox = new FifoInbox()
  inbox.add(invalidMessage)
  inbox.add(invalidMessage)
  inbox.add(invalidMessage)
  const fetcher = new PersistFetcher(inbox, evaluator, attempts)
  try {
    await fetcher.fetch(timeout)
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof ExhaustionError)
    t.is(e.message, 'max attempts')
  }
})

test('timeout', async t => {
  const inbox = new FifoInbox()
  const fetcher = new PersistFetcher(inbox, evaluator, attempts)
  try {
    await fetcher.fetch(0)
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof TimeoutError)
  }
})
