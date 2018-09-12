import test from 'ava'
import consoleMock from 'console-mock'
import ConsoleLogchan from 'logchan/console/main'
import send from 'logchan/console/send'

/* eslint-disable no-global-assign */
console = consoleMock.create()
consoleMock.enabled(false)

const testMessage = 'Test message'

test.before(t => {
  Object.assign(ConsoleLogchan.prototype, {
    send
  })
})

test('success', async t => {
  const logchan = new ConsoleLogchan()
  await logchan.send(testMessage)
  const history = consoleMock.history()
  const record = history[0]
  t.is(record.method, 'log')
  const args = record.arguments
  const message = args[0]
  t.is(message, testMessage)
})
