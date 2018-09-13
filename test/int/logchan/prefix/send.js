import test from 'ava'
import SpyLogchan from 'spy/logchan'
import PrefixLogchan from 'logchan/prefix/main'
import send from 'logchan/prefix/send'

const testPrefix = 'Prefix: '
const testMessage = 'Test message'
const expectedMessage = testPrefix + testMessage

test.before(t => {
  Object.assign(PrefixLogchan.prototype, {
    send
  })
})

test('prefixed', async t => {
  const nextLogchan = new SpyLogchan()
  const logchan = new PrefixLogchan(testPrefix, nextLogchan)
  await logchan.send(testMessage)
  const call = nextLogchan.send.firstCall
  const args = call.args
  const message = args[0]
  t.is(message, expectedMessage)
})
