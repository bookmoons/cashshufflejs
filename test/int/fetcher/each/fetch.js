import test from 'ava'
import Inbox from 'inbox/fifo'
import EachFetcher from 'fetcher/each/main'
import fetch from 'fetcher/each/fetch'

const timeout = 500

test.before(t => {
  Object.assign(EachFetcher.prototype, {
    fetch
  })
})

test('timeout', async t => {
  const inbox = new Inbox()
  const fetcher = new EachFetcher([ inbox ])
  await t.throwsAsync(async () => {
    await fetcher.fetch(0)
  })
})

test('1 inbox', async t => {
  const inbox = new Inbox()
  const fetcher = new EachFetcher([ inbox ])
  const fetchPromise = fetcher.fetch(timeout)
  const testMessage = {}
  inbox.add(testMessage)
  const messages = await fetchPromise
  const message = messages[0]
  t.is(message, testMessage)
})

test('3 inboxes', async t => {
  const inbox1 = new Inbox()
  const inbox2 = new Inbox()
  const inbox3 = new Inbox()
  const inboxes = [ inbox1, inbox2, inbox3 ]
  const fetcher = new EachFetcher(inboxes)
  const testMessage1 = {}
  const testMessage2 = {}
  const testMessage3 = {}
  inbox1.add(testMessage1)
  const fetchPromise = fetcher.fetch(timeout)
  inbox2.add(testMessage2)
  inbox3.add(testMessage3)
  const messages = await fetchPromise
  const message1 = messages[0]
  t.is(message1, testMessage1)
  const message2 = messages[1]
  t.is(message2, testMessage2)
  const message3 = messages[2]
  t.is(message3, testMessage3)
})
