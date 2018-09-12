import test from 'ava'
import FifoInbox from 'inbox/fifo'
import Fetcher from 'fetcher/base'
import EachFetcher from 'fetcher/each'

test('subclass', t => {
  const inbox = new FifoInbox()
  const inboxes = [ inbox ]
  const fetcher = new EachFetcher(inboxes)
  t.true(fetcher instanceof Fetcher)
})
