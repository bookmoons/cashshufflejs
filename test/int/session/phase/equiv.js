import test from 'ava'
import { readTo } from 'promised-read'
import { PassThrough } from 'stream'
import { ValueError } from 'error'
import Crypto from 'crypto/bitcore'
import Outchan from 'outchan/outchanbin'
import Outchanbin from 'outchanbin/nodestream'
import PhaseReceiver from 'receiver/phase'
import Signing from 'signing/bitcore'
import { Phase, terminatorBuffer, terminatorByteLength } from 'protocol'
import toArrayBuffer from 'util/toarraybuffer'
import loadProtocol from 'helper/loadprot'
import affix from 'session/affix'
import gatherDigest from 'session/gather/digest'
import messageDigest from 'session/message/digest'
import packageSignedPacket from 'session/package'
import sign from 'session/sign'
import validateDigest from 'session/validate/digest'
import checkEquivocation from 'session/phase/equiv'

const attempts = 2
const timeout = 500
const sessionId = toArrayBuffer(Buffer.from('123'))
const sessionIdView = new Uint8Array(sessionId)
const poolNumber1 = 1
const poolNumber2 = 2
const poolNumber3 = 3
const signingPrivateKey1 =
  '5906456d210ba118d153fde79b74d3806710c979d41b8b38d15c2e8a84d48466'
/*
const signingPrivateKey2 =
  '1d4341f3141fd3a329938d445a9f2fbd83e4faf5ed0d5dc86201782028881f52'
const signingPrivateKey3 =
  '59e0c13c7752db8c63a54d8a111327ed4a3e40ef480107ebc9e9ab5bc2fe9419'
*/
const signingPublicKey1 =
  '03bfe214b2d739c9373900c35f0533fae013f93c6b1eec1fb061a8b3e404f52d90'
const signingPublicKey2 =
  '0350efbed967151d023f4b9a8637fa01328d5851cc6e94f33ccdad659e6ff6ca57'
const signingPublicKey3 =
  '026e41a59fa68163abf6bec552fe48688ad7d342f2c047db7aa6acaf3d447709c5'
const participants =
  [ signingPublicKey1, signingPublicKey2, signingPublicKey3 ]
const encryptionPrivateKey1 =
  '32ff3a7363f71e0bc7cfbb36947d219a97d35c7d667bb25ed39b1999e78ac915'
const encryptionPublicKey2 =
  '0349357c0c89b0cd913ebdaf74a7ad337727c00b6001204f983efc72a368c4e4aa'
const encryptionPublicKey3 =
  '02c8c46130f5a7d74d95456857fc47c4f6372ca4ae1659595a09e3d99596132130'
const encryptionPublicKeys = [ encryptionPublicKey2, encryptionPublicKey3 ]
const output1 = 'bitcoincash:qrqpqsvcy94qfm3a8px0sxr5lmm825u3wv3l8fd6xf'
const output2 = 'bitcoincash:qqvm3zp009x5pvaclc7tf3r7h5v2k2le0qxazfnv6w'
const output3 = 'bitcoincash:qqqcrwfqh9jqpq8juwptrw384ltt2qyrcujwunn3v2'
const outputList = [ output1, output2, output3 ]
const hashString = '41765618ffef0694181d0a41ff122ae0078a7a905bad0196864649c4'
const hashBuffer = Buffer.from(hashString, 'hex')
const hash = toArrayBuffer(hashBuffer)
const hashView = new Uint8Array(hash)
const badHashString = '5678'
const badHashBuffer = Buffer.from(badHashString, 'hex')
const badHash = toArrayBuffer(badHashBuffer)
const badHashView = new Uint8Array(badHash)
let protocol

const expectedPacket1 = {
  session: sessionIdView,
  number: poolNumber1,
  fromKey: { key: signingPublicKey1 },
  phase: Phase.EquivocationCheck.value,
  message: { hash: { hash: hashView } }
}
const expectedSigned1 = { packet: expectedPacket1 }
const expectedPackets1 = { packet: [ expectedSigned1 ] }

const testPacket2 = {
  session: sessionIdView,
  number: poolNumber2,
  fromKey: { key: signingPublicKey2 },
  phase: Phase.EquivocationCheck.value,
  message: { hash: { hash: hashView } }
}
const testPacket3 = {
  session: sessionIdView,
  number: poolNumber3,
  fromKey: { key: signingPublicKey3 },
  phase: Phase.EquivocationCheck.value,
  message: { hash: { hash: hashView } }
}
const equivocatedPacket3 = {
  session: sessionIdView,
  number: poolNumber3,
  fromKey: { key: signingPublicKey3 },
  phase: Phase.EquivocationCheck.value,
  message: { hash: { hash: badHashView } }
}

function produceSession () {
  const session = {
    affix,
    gatherDigest,
    messageDigest,
    packageSignedPacket,
    sign,
    validateDigest,
    checkEquivocation
  }
  return session
}

function verifyEqualPackets (t, observed, expected) {
  t.is(typeof observed, 'object')
  t.is(typeof expected, 'object')
  t.is(observed.packet.length, expected.packet.length)
  const observedSigned = observed.packet[0]
  const expectedSigned = expected.packet[0]
  const observedPacket = observedSigned.packet
  const expectedPacket = expectedSigned.packet
  t.is(observedPacket.number, expectedPacket.number)
  t.is(observedPacket.phase, expectedPacket.phase)
  const observedSessionId = Buffer.from(observedPacket.session)
  const expectedSessionId = Buffer.from(expectedPacket.session)
  t.deepEqual(observedSessionId, expectedSessionId)
  const observedFromKey = observedPacket.fromKey
  const expectedFromKey = expectedPacket.fromKey
  t.is(observedFromKey.key, expectedFromKey.key)
  const observedMessage = observedPacket.message
  const expectedMessage = expectedPacket.message
  const observedHashObject = observedMessage.hash
  const expectedHashObject = expectedMessage.hash
  const observedHash = Buffer.from(observedHashObject.hash)
  const expectedHash = Buffer.from(expectedHashObject.hash)
  t.deepEqual(observedHash, expectedHash)
}

test.before(async t => {
  protocol = await loadProtocol()
})

test('succeed', async t => {
  const session = produceSession()
  const signing = new Signing()
  await signing.restoreKeyPair(signingPrivateKey1)
  const crypto = new Crypto()
  await crypto.restoreKeyPair(encryptionPrivateKey1)
  const outputStream = new PassThrough()
  const outchanbin = new Outchanbin(outputStream)
  const outchan = new Outchan(outchanbin, protocol)
  const receiver = new PhaseReceiver(participants)
  const inboxes = receiver.participantInboxes
  const inbox2 = inboxes.get(signingPublicKey2)
  inbox2.add(testPacket2)
  const inbox3 = inboxes.get(signingPublicKey3)
  inbox3.add(testPacket3)
  await session.checkEquivocation({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber: poolNumber1,
    signingKeyPair: signing,
    encryptionPublicKeys,
    outputList,
    crypto,
    outchan,
    receiver
  })
  const frameBuffer = await readTo(outputStream, terminatorBuffer)
  const messageLength = frameBuffer.length - terminatorByteLength
  const messageBuffer = frameBuffer.slice(0, messageLength)
  const packets = protocol.Packets.decode(messageBuffer)
  const packetsObject = protocol.Packets.toObject(packets)
  verifyEqualPackets(t, packetsObject, expectedPackets1)
})

test('fail', async t => {
  const session = produceSession()
  const signing = new Signing()
  await signing.restoreKeyPair(signingPrivateKey1)
  const crypto = new Crypto()
  await crypto.restoreKeyPair(encryptionPrivateKey1)
  const outputStream = new PassThrough()
  const outchanbin = new Outchanbin(outputStream)
  const outchan = new Outchan(outchanbin, protocol)
  const receiver = new PhaseReceiver(participants)
  const inboxes = receiver.participantInboxes
  const inbox2 = inboxes.get(signingPublicKey2)
  inbox2.add(testPacket2)
  const inbox3 = inboxes.get(signingPublicKey3)
  inbox3.add(equivocatedPacket3)
  const checkEquivocationPromise = session.checkEquivocation({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber: poolNumber1,
    signingKeyPair: signing,
    encryptionPublicKeys,
    outputList,
    crypto,
    outchan,
    receiver
  })
  try {
    await checkEquivocationPromise
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof ValueError)
    t.is(e.message, 'equivocation')
  }
})
