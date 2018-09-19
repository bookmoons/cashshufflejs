import test from 'ava'
import { PassThrough } from 'stream'
import NodeStreamInchanbin from 'inchanbin/nodestream'
import loadProtocol from 'helper/loadprot'
import Inchan from 'inchan/base'
import InchanbinInchan from 'inchan/inchanbin'

let protocol

test.before(async t => {
  protocol = await loadProtocol
})

test('subclass', t => {
  const inputStream = new PassThrough()
  const inchanbin = new NodeStreamInchanbin(inputStream)
  const inchan = new InchanbinInchan(inchanbin, protocol)
  t.true(inchan instanceof Inchan)
})
