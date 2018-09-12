import test from 'ava'
import { file as tempFile } from 'tmp-promise'
import Logchan from 'logchan/base'
import FileLogchan from 'logchan/file'

test('subclass', async t => {
  const { path } = await tempFile()
  const logchan = new FileLogchan(path)
  t.true(logchan instanceof Logchan)
})
