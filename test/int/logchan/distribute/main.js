import test from 'ava'
import DummyLogchan from 'dummy/logchan'
import Logchan from 'logchan/base'
import DistributeLogchan from 'logchan/distribute'

test('subclass', t => {
  const recipient = new DummyLogchan()
  const recipients = [ recipient ]
  const logchan = new DistributeLogchan(recipients)
  t.true(logchan instanceof Logchan)
})
