import test from 'ava'
import { PassThrough } from 'stream'
import Inchanbin from 'inchanbin/base'
import NodeStreamInchanbin from 'inchanbin/nodestream'

test('subclass', t => {
  const inputStream = new PassThrough()
  const inchanbin = new NodeStreamInchanbin(inputStream)
  t.true(inchanbin instanceof Inchanbin)
})
