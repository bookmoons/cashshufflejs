import test from 'ava'
import loadProtocol from 'helper/loadprot'
import DummyReceiver from 'dummy/receiver'
import Receiver from 'receiver/base'
import AuthenticateReceiver from 'receiver/authenticate'

let protocol

test.before(async t => {
  protocol = await loadProtocol()
})

test('subclass', t => {
  const nextReceiver = new DummyReceiver()
  const receiver = new AuthenticateReceiver(protocol, nextReceiver)
  t.true(receiver instanceof Receiver)
})
