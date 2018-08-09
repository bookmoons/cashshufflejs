import test from 'ava'
import { readFileSync } from 'fs'
import { file as tempFile } from 'tmp-promise'
import Logchan from 'logchan/file/main'
import send from 'logchan/file/send'

const message = 'Test message'
const packet = message + '\n'

test.before(t => {
  Object.assign(Logchan.prototype, {
    send
  })
})

test('undefined fails', async t => {
  const logchan = new Logchan()
  await t.throws(async () => {
    await logchan.send(message)
  })
})

test('null fails', async t => {
  const logchan = new Logchan(null)
  await t.throws(async () => {
    await logchan.send(message)
  })
})

test('succeed', async t => {
  const { path } = await tempFile()
  const logchan = new Logchan(path)
  await logchan.send(message)
  const contents = readFileSync(path, { encoding: 'utf8' })
  t.is(contents, packet)
})
