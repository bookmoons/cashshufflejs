import test from 'ava'
import Inbox from 'inbox/fifo'
import StoreReceiver from 'receiver/store'
import Receiver from 'receiver/session/main'
import submit from 'receiver/session/submit'

const shufflerKey = 'Shuffler key'
const shufflers = [ shufflerKey ]
const validPhaseIdentifier1 = 0
const validPhaseIdentifier2 = 1
const invalidPhaseIdentifier = -1
const phaseIdentifiers = [ validPhaseIdentifier1, validPhaseIdentifier2 ]

/** @param {Array} phaseInboxes - Array to store phase inboxes to. */
function createPhaseReceiver (phaseInboxes) {
  const inbox = new Inbox()
  phaseInboxes.push(inbox)
  const receiver = new StoreReceiver(inbox)
  return receiver
}

test.before(t => {
  Object.assign(Receiver.prototype, {
    submit
  })
})

test('1 message', async t => {
  const phaseInboxes = []
  function phaseReceiverFactory () {
    return createPhaseReceiver(phaseInboxes)
  }
  const discarderInbox = new Inbox()
  const discarder = new StoreReceiver(discarderInbox)
  const receiver = new Receiver(
    shufflers,
    phaseIdentifiers,
    discarder,
    phaseReceiverFactory
  )
  const testMessage = { phase: validPhaseIdentifier1 }
  await receiver.submit(testMessage)
  const phaseInbox = phaseInboxes[validPhaseIdentifier1]
  const message = phaseInbox.receive()
  t.deepEqual(message, testMessage)
})

test('2 messages', async t => {
  const phaseInboxes = []
  function phaseReceiverFactory () {
    return createPhaseReceiver(phaseInboxes)
  }
  const discarderInbox = new Inbox()
  const discarder = new StoreReceiver(discarderInbox)
  const receiver = new Receiver(
    shufflers,
    phaseIdentifiers,
    discarder,
    phaseReceiverFactory
  )
  const testMessage1 = { phase: validPhaseIdentifier1 }
  const testMessage2 = { phase: validPhaseIdentifier2 }
  await receiver.submit(testMessage1)
  await receiver.submit(testMessage2)
  const phaseInbox1 = phaseInboxes[validPhaseIdentifier1]
  const message1 = phaseInbox1.receive()
  t.deepEqual(message1, testMessage1)
  const phaseInbox2 = phaseInboxes[validPhaseIdentifier2]
  const message2 = phaseInbox2.receive()
  t.deepEqual(message2, testMessage2)
})

test('invalid phase', async t => {
  const phaseInboxes = []
  function phaseReceiverFactory () {
    return createPhaseReceiver(phaseInboxes)
  }
  const discarderInbox = new Inbox()
  const discarder = new StoreReceiver(discarderInbox)
  const receiver = new Receiver(
    shufflers,
    phaseIdentifiers,
    discarder,
    phaseReceiverFactory
  )
  const testMessage = { phase: invalidPhaseIdentifier }
  await receiver.submit(testMessage)
  t.notThrows(() => { // Message discarded
    discarderInbox.receive()
  })
})
