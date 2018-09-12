import test from 'ava'
import { PassThrough } from 'stream'
import FifoInbox from 'inbox/fifo'
import Inchan from 'inchan/inchanbin'
import Inchanbin from 'inchanbin/nodestream'
import StoreReceiver from 'receiver/store'
import loadProtocol from 'helper/loadprot'
import Drawer from 'drawer/base'
import StandardDrawer from 'drawer/standard'

let protocol

test.before(async t => {
  protocol = await loadProtocol
})

test('subclass', t => {
  const inputStream = new PassThrough()
  const inchanbin = new Inchanbin(inputStream)
  const inchan = new Inchan(inchanbin, protocol)
  const inbox = new FifoInbox()
  const receiver = new StoreReceiver(inbox)
  const drawer = new StandardDrawer(inchan, receiver)
  t.true(drawer instanceof Drawer)
})
