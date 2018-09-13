import test from 'ava'
import DummyLogchan from 'dummy/logchan'
import Discarder from 'discarder/base'
import LogDiscarder from 'discarder/log'

test('subclass', t => {
  const logchan = new DummyLogchan()
  const discarder = new LogDiscarder(logchan)
  t.true(discarder instanceof Discarder)
})
