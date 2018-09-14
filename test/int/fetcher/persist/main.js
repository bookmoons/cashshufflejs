import test from 'ava'
import dummyFunction from 'dummy/function'
import DummyInbox from 'dummy/inbox'
import Fetcher from 'fetcher/base'
import PersistFetcher from 'fetcher/persist'

test('subclass', t => {
  const inbox = new DummyInbox()
  const evaluator = dummyFunction
  const attempts = 1
  const fetcher = new PersistFetcher(inbox, evaluator, attempts)
  t.true(fetcher instanceof Fetcher)
})
