import test from 'ava'
import DummyLogchan from 'dummy/logchan'
import Logchan from 'logchan/base'
import PrefixLogchan from 'logchan/prefix'

const testPrefix = 'Test prefix: '

test('subclass', t => {
  const nextLogchan = new DummyLogchan()
  const logchan = new PrefixLogchan(testPrefix, nextLogchan)
  t.true(logchan instanceof Logchan)
})
