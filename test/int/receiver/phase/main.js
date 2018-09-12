import test from 'ava'
import Receiver from 'receiver/base'
import PhaseReceiver from 'receiver/phase'

const participant = 'Test participant public key'
const participants = [ participant ]

test('subclass', t => {
  const receiver = new PhaseReceiver(participants)
  t.true(receiver instanceof Receiver)
})
