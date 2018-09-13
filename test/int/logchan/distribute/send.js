import test from 'ava'
import SpyLogchan from 'spy/logchan'
import DistributeLogchan from 'logchan/distribute/main'
import send from 'logchan/distribute/send'

const testMessage = 'Test message'

test.before(t => {
  Object.assign(DistributeLogchan.prototype, {
    send
  })
})

test('delivery', async t => {
  const recipient1 = new SpyLogchan()
  const recipient2 = new SpyLogchan()
  const recipients = [ recipient1, recipient2 ]
  const logchan = new DistributeLogchan(recipients)
  await logchan.send(testMessage)
  const call1 = recipient1.send.firstCall
  const message1 = call1.args[0]
  t.is(message1, testMessage)
  const call2 = recipient2.send.firstCall
  const message2 = call2.args[0]
  t.is(message2, testMessage)
})
