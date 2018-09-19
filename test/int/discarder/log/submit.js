import test from 'ava'
import SpyLogchan from 'spy/logchan'
import LogDiscarder from 'discarder/log/main'
import submit from 'discarder/log/submit'

const testErrorMessage = 'Test error message'
const testError = new Error(testErrorMessage)
const testMessage = {}
const expectedMessage = 'Discarded message: ' + testError.message

test.before(t => {
  Object.assign(LogDiscarder.prototype, {
    submit
  })
})

test('log', async t => {
  const logchan = new SpyLogchan()
  const discarder = new LogDiscarder(logchan)
  await discarder.submit([ testMessage, testError ])
  const call = logchan.send.firstCall
  const message = call.args[0]
  t.is(message, expectedMessage)
})
