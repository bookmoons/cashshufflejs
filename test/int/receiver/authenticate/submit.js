import test from 'ava'
import loadProtocol from 'helper/loadprot'
import Inbox from 'inbox/fifo'
import StoreReceiver from 'receiver/store'
import { stringToUtf8 } from 'aid'
import Receiver from 'receiver/authenticate/main'
import submit from 'receiver/authenticate/submit'

const publicKeyString =
  '02d069ccd579a6bedd3e65d1c528373b77d76e376e31d02533fb0f27ef08d50a82'
const validSignatureString =
  'H36L4/TUjDBu62OKoAbDK7BNw/Ds26t8G/9rnaodz9NvTn2HUAop/7/55F2hhF/T9E' +
  'vgLp/j8yCA/9GFDxC6LaQ='
const validSignatureBytes = stringToUtf8(validSignatureString)
const invalidSignatureString =
  'A36L4/TUjDBu62OKoAbDK7BNw/Ds26t8G/9rnaodz9NvTn2HUAop/7/55F2hhF/T9E' +
  'vgLp/j8yCA/9GFDxC6LaQ='
const invalidSignatureBytes = stringToUtf8(invalidSignatureString)
const testPacketObject = {
  fromKey: {
    key: publicKeyString
  }
}
const testValidMessageObject = {
  packet: testPacketObject,
  signature: {
    signature: validSignatureBytes
  }
}
const testInvalidMessageObject = {
  packet: testPacketObject,
  signature: {
    signature: invalidSignatureBytes
  }
}
let protocol

test.before(async t => {
  Object.assign(Receiver.prototype, {
    submit
  })
  protocol = await loadProtocol()
})

test('valid', async t => {
  const discarderInbox = new Inbox()
  const discarder = new StoreReceiver(discarderInbox)
  const nextInbox = new Inbox()
  const nextReceiver = new StoreReceiver(nextInbox)
  const receiver = new Receiver({ protocol, nextReceiver, discarder })
  const testMessage = protocol.Signed.fromObject(testValidMessageObject)
  await receiver.submit(testMessage)
  t.throws(() => { // Message not discarded
    discarderInbox.receive()
  })
})

test('invalid', async t => {
  const discarderInbox = new Inbox()
  const discarder = new StoreReceiver(discarderInbox)
  const nextInbox = new Inbox()
  const nextReceiver = new StoreReceiver(nextInbox)
  const receiver = new Receiver({ protocol, nextReceiver, discarder })
  const testMessage = protocol.Signed.fromObject(testInvalidMessageObject)
  await receiver.submit(testMessage)
  t.notThrows(() => { // Message discarded
    discarderInbox.receive()
  })
})
