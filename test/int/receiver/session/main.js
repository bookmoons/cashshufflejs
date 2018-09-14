import test from 'ava'
import Receiver from 'receiver/base'
import SessionReceiver from 'receiver/session'

const shuffler = 'Test shuffler public key'
const shufflers = [ shuffler ]
const phaseIdentifier = 8
const phaseIdentifiers = [ phaseIdentifier ]

test('subclass', t => {
  const receiver = new SessionReceiver(shufflers, phaseIdentifiers)
  t.true(receiver instanceof Receiver)
})
