import test from 'ava'
import { PassThrough } from 'stream'
import NodeStreamOutchanbin from 'outchanbin/nodestream'
import loadProtocol from 'helper/loadprot'
import Outchan from 'outchan/base'
import OutchanbinOutchan from 'outchan/outchanbin'

let protocol

test.before(async t => {
  protocol = await loadProtocol()
})

test('subclass', t => {
  const outputStream = new PassThrough()
  const outchanbin = new NodeStreamOutchanbin(outputStream)
  const outchan = new OutchanbinOutchan(outchanbin, protocol)
  t.true(outchan instanceof Outchan)
})
