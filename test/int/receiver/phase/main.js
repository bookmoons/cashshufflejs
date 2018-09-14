import test from 'ava'
import Receiver from 'receiver/base'
import PhaseReceiver from 'receiver/phase'

const shuffler = 'Test shuffler public key'
const shufflers = [ shuffler ]

test('subclass', t => {
  const receiver = new PhaseReceiver(shufflers)
  t.true(receiver instanceof Receiver)
})
