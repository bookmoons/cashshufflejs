import test from 'ava'
import { PassThrough } from 'stream'
import Outchanbin from 'outchanbin/base'
import NodeStreamOutchanbin from 'outchanbin/nodestream'

test('subclass', t => {
  const outputStream = new PassThrough()
  const outchanbin = new NodeStreamOutchanbin(outputStream)
  t.true(outchanbin instanceof Outchanbin)
})
