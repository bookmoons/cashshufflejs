import test from 'ava'
import Receiver from 'receiver/base'
import SessionReceiver from 'receiver/session'

const participant = 'Test participant public key'
const participants = [ participant ]
const phaseIdentifier = 8
const phaseIdentifiers = [ phaseIdentifier ]

test('subclass', t => {
  const receiver = new SessionReceiver(participants, phaseIdentifiers)
  t.true(receiver instanceof Receiver)
})
