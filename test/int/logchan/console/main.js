import test from 'ava'
import Logchan from 'logchan/base'
import ConsoleLogchan from 'logchan/console'

test('subclass', t => {
  const logchan = new ConsoleLogchan()
  t.true(logchan instanceof Logchan)
})
