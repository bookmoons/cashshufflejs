import test from 'ava'
import bitcore from 'bitcore-lib-cash'
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
import { outputListDelimiter } from 'session/value'
import affix from 'session/affix'
import decryptOutputList from 'session/adjunct/decrypt'
import gatherFinalOutput from 'session/gather/finaloutput'
import gatherOutputList from 'session/gather/outputlist'
import messageFinalOutput from 'session/message/finaloutput'
import packageSignedPacket from 'session/package'
import validateFinalOutput from 'session/validate/finaloutput'
import validateOutputList from 'session/validate/outputlist'
import sign from 'session/sign'
import broadcastOutput from 'session/phase/output'

const attempts = 2
const timeout = 500
const sessionId = toArrayBuffer(Buffer.from('123'))
const sessionIdView = new Uint8Array(sessionId)
const participantNumber = 12
/*
const signingPrivateKey1 =
  '5906456d210ba118d153fde79b74d3806710c979d41b8b38d15c2e8a84d48466'
*/
const signingPrivateKey2 =
  '1d4341f3141fd3a329938d445a9f2fbd83e4faf5ed0d5dc86201782028881f52'
const signingPrivateKey3 =
  '59e0c13c7752db8c63a54d8a111327ed4a3e40ef480107ebc9e9ab5bc2fe9419'
const signingPublicKey1 =
  '03bfe214b2d739c9373900c35f0533fae013f93c6b1eec1fb061a8b3e404f52d90'
const signingPublicKey2 =
  '0350efbed967151d023f4b9a8637fa01328d5851cc6e94f33ccdad659e6ff6ca57'
const signingPublicKey3 =
  '026e41a59fa68163abf6bec552fe48688ad7d342f2c047db7aa6acaf3d447709c5'
const participants =
  [ signingPublicKey1, signingPublicKey2, signingPublicKey3 ]
const lastParticipant = signingPublicKey3
/*
const encryptionPrivateKey1 =
  '32ff3a7363f71e0bc7cfbb36947d219a97d35c7d667bb25ed39b1999e78ac915'
*/
const encryptionPrivateKey2 =
  '13b41346a85e9dfd08b6cc77b15b1a5458d8a0caa7aa804c2c9bb611d812147c'
const encryptionPrivateKey3 =
  '7f7ac27f3970e8232e14c3a800a06659b5a7cee587a4a33efe5c1ec5f1f53512'
const output1 = 'bitcoincash:qrqpqsvcy94qfm3a8px0sxr5lmm825u3wv3l8fd6xf'
const output2 = 'bitcoincash:qqvm3zp009x5pvaclc7tf3r7h5v2k2le0qxazfnv6w'
const output3 = 'bitcoincash:qqqcrwfqh9jqpq8juwptrw384ltt2qyrcujwunn3v2'
const encryptedOutput1 =
  'ArtnDVpFV3ICkIqUQJ8ekNMv6+27ngdP4gXgE/YuJhzWG5YpTsglHm0B1lfMlJdE1v9o' +
  'scpEuCUbw/Rzj/QEIgH29CgmhyFTvyGAJPTMdw2Qo/yDllIB/i4f+uf5PAwq5xxwytju' +
  'xEITCYzeV7J3LFnj7tMXWuendeaDeae+vyfUocST1vnpXVe4MJmUaKYIEg=='
const encryptedOutput2 =
  'A0k1fAyJsM2RPr2vdKetM3cnwAtgASBPmD78cqNoxOSqQ7Bg3Rt40cFuOm9R3ZlG1HGU' +
  'LipoGf15WG1Q83DQ6NXOqqpR65iUBHMW8MOtF5JW9IVFkynj6omY5cx9QrgMzQF64erB' +
  'PdGlQmpXOM4yH92RbfdgeSbszdm0S7JwESvyF+zfey/RkfK+BQpe646Zrw=='
const encryptedOutputList = [ encryptedOutput1, encryptedOutput2 ]
const encryptedOutputListEncoded =
  encryptedOutputList.join(outputListDelimiter)
const finalOutputList = [ output1, output2, output3 ]
const finalOutputListEncoded = finalOutputList.join(outputListDelimiter)
const badOutputList = [ output1, output3 ]
const badOutputListEncoded = badOutputList.join(outputListDelimiter)
let protocol

const encryptedOutputListPacket = {
  session: sessionId,
  number: participantNumber,
  fromKey: { key: signingPublicKey2 },
  toKey: { key: signingPublicKey3 },
  phase: Phase.Shuffle.value,
  message: { str: encryptedOutputListEncoded }
}
const finalOutputListPacket = {
  session: sessionId,
  number: participantNumber,
  fromKey: { key: signingPublicKey3 },
  phase: Phase.Broadcast.value,
  message: { str: finalOutputListEncoded }
}
const badOutputListPacket = {
  session: sessionId,
  number: participantNumber,
  fromKey: { key: signingPublicKey3 },
  phase: Phase.Broadcast.value,
  message: { str: badOutputListEncoded }
}

const testFinalOutputPacket = {
  session: sessionIdView,
  number: participantNumber,
  fromKey: { key: signingPublicKey3 },
  phase: Phase.Broadcast.value
}
const testFinalOutputSigned = { packet: testFinalOutputPacket }
const testFinalOutputPackets = { packet: [ testFinalOutputSigned ] }

function produceSession () {
  const session = {
    affix,
    decryptOutputList,
    gatherFinalOutput,
    gatherOutputList,
    messageFinalOutput,
    packageSignedPacket,
    validateFinalOutput,
    validateOutputList,
    sign,
    broadcastOutput
  }
  return session
}

function verifyOutputList (t, outputList) {
  for (const item of outputList) {
    t.is(typeof item, 'string')
    t.notThrows(() => {
      /* eslint-disable no-new */
      new bitcore.Address(item)
    })
  }
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
}

test.before(async t => {
  protocol = await loadProtocol()
})

test('return last', async t => {
  const session = produceSession()
  const signing = new Signing()
  await signing.restoreKeyPair(signingPrivateKey3)
  const crypto = new Crypto()
  await crypto.restoreKeyPair(encryptionPrivateKey3)
  const outputStream = new PassThrough()
  const outchanbin = new Outchanbin(outputStream)
  const outchan = new Outchan(outchanbin, protocol)
  const receiver = new PhaseReceiver(participants)
  const priorReceiver = new PhaseReceiver(participants)
  const inboxes = priorReceiver.participantInboxes
  const inbox = inboxes.get(signingPublicKey2)
  inbox.add(encryptedOutputListPacket)
  const { outputList } = await session.broadcastOutput({
    protocol,
    attempts,
    timeout,
    sessionId,
    participantNumber,
    signingKeyPair: signing,
    last: true,
    priorParticipant: signingPublicKey2,
    lastParticipant,
    outputAddress: output3,
    crypto,
    outchan,
    receiver,
    priorReceiver
  })
  verifyOutputList(t, outputList)
})

test('return nonlast', async t => {
  const session = produceSession()
  const signing = new Signing()
  await signing.restoreKeyPair(signingPrivateKey2)
  const crypto = new Crypto()
  await crypto.restoreKeyPair(encryptionPrivateKey2)
  const outputStream = new PassThrough()
  const outchanbin = new Outchanbin(outputStream)
  const outchan = new Outchan(outchanbin, protocol)
  const receiver = new PhaseReceiver(participants)
  const priorReceiver = new PhaseReceiver(participants)
  const inboxes = receiver.participantInboxes
  const inbox = inboxes.get(signingPublicKey3)
  inbox.add(finalOutputListPacket)
  const { outputList } = await session.broadcastOutput({
    protocol,
    attempts,
    timeout,
    sessionId,
    participantNumber,
    signingKeyPair: signing,
    last: false,
    priorParticipant: signingPublicKey1,
    lastParticipant,
    outputAddress: output2,
    crypto,
    outchan,
    receiver,
    priorReceiver
  })
  verifyOutputList(t, outputList)
})

test('output', async t => {
  const session = produceSession()
  const signing = new Signing()
  await signing.restoreKeyPair(signingPrivateKey3)
  const crypto = new Crypto()
  await crypto.restoreKeyPair(encryptionPrivateKey3)
  const outputStream = new PassThrough()
  const outchanbin = new Outchanbin(outputStream)
  const outchan = new Outchan(outchanbin, protocol)
  const receiver = new PhaseReceiver(participants)
  const priorReceiver = new PhaseReceiver(participants)
  const inboxes = priorReceiver.participantInboxes
  const inbox = inboxes.get(signingPublicKey2)
  inbox.add(encryptedOutputListPacket)
  await session.broadcastOutput({
    protocol,
    attempts,
    timeout,
    sessionId,
    participantNumber,
    signingKeyPair: signing,
    last: true,
    priorParticipant: signingPublicKey2,
    lastParticipant,
    outputAddress: output3,
    crypto,
    outchan,
    receiver,
    priorReceiver
  })
  const frameBuffer = await readTo(outputStream, terminatorBuffer)
  const messageLength = frameBuffer.length - terminatorByteLength
  const messageBuffer = frameBuffer.slice(0, messageLength)
  const packets = protocol.Packets.decode(messageBuffer)
  const packetsObject = protocol.Packets.toObject(packets)
  verifyEqualPackets(t, packetsObject, testFinalOutputPackets)
  const signedObject = packetsObject.packet[0]
  const packetObject = signedObject.packet
  const messageObject = packetObject.message
  const outputListEncoded = messageObject.str
  const outputList = outputListEncoded.split(outputListDelimiter)
  t.is(outputList.length, 3)
  verifyOutputList(t, outputList)
  const outputListSet = new Set(outputList)
  t.true(outputListSet.has(output1))
  t.true(outputListSet.has(output2))
  t.true(outputListSet.has(output3))
})

test('missing output', async t => {
  const session = produceSession()
  const signing = new Signing()
  await signing.restoreKeyPair(signingPrivateKey2)
  const crypto = new Crypto()
  await crypto.restoreKeyPair(encryptionPrivateKey2)
  const outputStream = new PassThrough()
  const outchanbin = new Outchanbin(outputStream)
  const outchan = new Outchan(outchanbin, protocol)
  const receiver = new PhaseReceiver(participants)
  const inboxes = receiver.participantInboxes
  const inbox = inboxes.get(signingPublicKey3)
  inbox.add(badOutputListPacket)
  const broadcastOutputPromise = session.broadcastOutput({
    protocol,
    attempts,
    timeout,
    sessionId,
    participantNumber,
    signingKeyPair: signing,
    last: false,
    priorParticipant: signingPublicKey1,
    lastParticipant,
    outputAddress: output2,
    crypto,
    outchan,
    receiver
  })
  try {
    await broadcastOutputPromise
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof ValueError)
    t.is(e.message, 'output missing')
  }
})
