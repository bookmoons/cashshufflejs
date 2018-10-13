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
import { Phase, terminatorByteLength, terminatorNodeBuffer } from 'protocol'
import { hexToBytes } from 'aid/convert'
import { normalizeProtobufBytes } from 'aid/normalize'
import loadProtocol from 'helper/loadprot'
import affix from 'session/util/affix'
import decryptOutputList from 'session/adjunct/decrypt'
import gatherFinalOutput from 'session/gather/finalout'
import gatherShuffleOutput from 'session/gather/shuffleout'
import messageFinalOutput from 'session/message/finalout'
import packageSignedPackets from 'session/util/packs'
import validateFinalOutput from 'session/validate/finalout'
import validateShuffleOutput from 'session/validate/shuffleout'
import sign from 'session/util/sign'
import broadcastOutput from 'session/phase/output'

const attempts = 2
const timeout = 500
const sessionId = hexToBytes('1234')
const poolNumber = 12
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
const shufflers =
  [ signingPublicKey1, signingPublicKey2, signingPublicKey3 ]
const shufflersCount = shufflers.length
const lastShuffler = signingPublicKey3
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
const badOutput = 'bitcoincash:qqqcrwfqh9jqpq8juwptrw384ltt2qyrcujwunn3v3'
const encryptedOutput1 =
  'ArtnDVpFV3ICkIqUQJ8ekNMv6+27ngdP4gXgE/YuJhzWG5YpTsglHm0B1lfMlJdE1v9o' +
  'scpEuCUbw/Rzj/QEIgH29CgmhyFTvyGAJPTMdw2Qo/yDllIB/i4f+uf5PAwq5xxwytju' +
  'xEITCYzeV7J3LFnj7tMXWuendeaDeae+vyfUocST1vnpXVe4MJmUaKYIEg=='
const encryptedOutput2 =
  'A0k1fAyJsM2RPr2vdKetM3cnwAtgASBPmD78cqNoxOSqQ7Bg3Rt40cFuOm9R3ZlG1HGU' +
  'LipoGf15WG1Q83DQ6NXOqqpR65iUBHMW8MOtF5JW9IVFkynj6omY5cx9QrgMzQF64erB' +
  'PdGlQmpXOM4yH92RbfdgeSbszdm0S7JwESvyF+zfey/RkfK+BQpe646Zrw=='
let protocol

const encryptedOutputListPacket1 = {
  session: sessionId,
  number: poolNumber,
  fromKey: { key: signingPublicKey2 },
  toKey: { key: signingPublicKey3 },
  phase: Phase.Shuffle.value,
  message: { str: encryptedOutput1 }
}
const encryptedOutputListPacket2 = {
  session: sessionId,
  number: poolNumber,
  fromKey: { key: signingPublicKey2 },
  toKey: { key: signingPublicKey3 },
  phase: Phase.Shuffle.value,
  message: { str: encryptedOutput2 }
}
const finalOutputListPacket1 = {
  session: sessionId,
  number: poolNumber,
  fromKey: { key: signingPublicKey3 },
  phase: Phase.Broadcast.value,
  message: { str: output1 }
}
const finalOutputListPacket2 = {
  session: sessionId,
  number: poolNumber,
  fromKey: { key: signingPublicKey3 },
  phase: Phase.Broadcast.value,
  message: { str: output2 }
}
const finalOutputListPacket3 = {
  session: sessionId,
  number: poolNumber,
  fromKey: { key: signingPublicKey3 },
  phase: Phase.Broadcast.value,
  message: { str: output3 }
}
const badOutputListPacket = {
  session: sessionId,
  number: poolNumber,
  fromKey: { key: signingPublicKey3 },
  phase: Phase.Broadcast.value,
  message: { str: badOutput }
}

const finalOutputListSigned1 = { packet: finalOutputListPacket1 }
const finalOutputListSigned2 = { packet: finalOutputListPacket2 }
const finalOutputListSigned3 = { packet: finalOutputListPacket3 }
const finalOutputSignedPackets = [
  finalOutputListSigned1,
  finalOutputListSigned2,
  finalOutputListSigned3
]
const finalOutputListPackets = { packet: finalOutputSignedPackets }

function produceSession () {
  const session = {
    affix,
    decryptOutputList,
    gatherFinalOutput,
    gatherShuffleOutput,
    messageFinalOutput,
    packageSignedPackets,
    validateFinalOutput,
    validateShuffleOutput,
    sign,
    broadcastOutput
  }
  return session
}

function verifyOutputList (t, outputList) {
  for (const item of outputList) {
    t.is(typeof item, 'string')
    t.notThrows(() => {
      new bitcore.Address(item) /* eslint-disable-line no-new */
    })
  }
}

function verifyEqualPacket (t, observed, expected) {
  t.is(observed.number, expected.number)
  t.is(observed.phase, expected.phase)
  const observedSessionId = normalizeProtobufBytes(observed.session)
  const expectedSessionId = normalizeProtobufBytes(expected.session)
  t.deepEqual(observedSessionId, expectedSessionId)
  const observedFromKey = observed.fromKey
  const expectedFromKey = expected.fromKey
  t.is(observedFromKey.key, expectedFromKey.key)
}

function verifyEqualPackets (t, observed, expected) {
  t.is(typeof observed, 'object')
  t.is(typeof expected, 'object')
  t.is(observed.packet.length, expected.packet.length)
  const observedSignedPackets = observed.packet
  const expectedSignedPackets = expected.packet
  for (let i = 0; i < observedSignedPackets.length; i++) {
    const observedSigned = observedSignedPackets[i]
    const expectedSigned = expectedSignedPackets[i]
    const observedPacket = observedSigned.packet
    const expectedPacket = expectedSigned.packet
    verifyEqualPacket(t, observedPacket, expectedPacket)
  }
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
  const receiver = new PhaseReceiver(shufflers)
  const priorReceiver = new PhaseReceiver(shufflers)
  const inboxes = priorReceiver.shufflerInboxes
  const inbox = inboxes.get(signingPublicKey2)
  inbox.add(encryptedOutputListPacket1)
  inbox.add(encryptedOutputListPacket2)
  const { outputList } = await session.broadcastOutput({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber,
    signingKeyPair: signing,
    last: true,
    shufflersCount,
    precedingShufflersCount: 2,
    priorShuffler: signingPublicKey2,
    lastShuffler,
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
  const receiver = new PhaseReceiver(shufflers)
  const priorReceiver = new PhaseReceiver(shufflers)
  const inboxes = receiver.shufflerInboxes
  const inbox = inboxes.get(signingPublicKey3)
  inbox.add(finalOutputListPacket1)
  inbox.add(finalOutputListPacket2)
  inbox.add(finalOutputListPacket3)
  const { outputList } = await session.broadcastOutput({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber,
    signingKeyPair: signing,
    last: false,
    shufflersCount,
    precedingShufflersCount: 1,
    priorShuffler: signingPublicKey1,
    lastShuffler,
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
  const receiver = new PhaseReceiver(shufflers)
  const priorReceiver = new PhaseReceiver(shufflers)
  const inboxes = priorReceiver.shufflerInboxes
  const inbox = inboxes.get(signingPublicKey2)
  inbox.add(encryptedOutputListPacket1)
  inbox.add(encryptedOutputListPacket2)
  await session.broadcastOutput({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber,
    signingKeyPair: signing,
    last: true,
    shufflersCount,
    precedingShufflersCount: 2,
    priorShuffler: signingPublicKey2,
    lastShuffler,
    outputAddress: output3,
    crypto,
    outchan,
    receiver,
    priorReceiver
  })
  const frameBuffer = await readTo(outputStream, terminatorNodeBuffer)
  const messageLength = frameBuffer.length - terminatorByteLength
  const messageBuffer = frameBuffer.slice(0, messageLength)
  const packets = protocol.Packets.decode(messageBuffer)
  const packetsObject = protocol.Packets.toObject(packets)
  verifyEqualPackets(t, packetsObject, finalOutputListPackets)
  const signedPacketObjects = packetsObject.packet
  const outputList = new Set()
  for (const signedPacketObject of signedPacketObjects) {
    const packetObject = signedPacketObject.packet
    const messageObject = packetObject.message
    const observedOutput = messageObject.str
    outputList.add(observedOutput)
  }
  t.is(outputList.size, 3)
  t.true(outputList.has(output1))
  t.true(outputList.has(output2))
  t.true(outputList.has(output3))
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
  const receiver = new PhaseReceiver(shufflers)
  const inboxes = receiver.shufflerInboxes
  const inbox = inboxes.get(signingPublicKey3)
  inbox.add(finalOutputListPacket1)
  inbox.add(badOutputListPacket)
  inbox.add(finalOutputListPacket3)
  const broadcastOutputPromise = session.broadcastOutput({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber,
    signingKeyPair: signing,
    last: false,
    shufflersCount,
    precedingShufflersCount: 1,
    priorShuffler: signingPublicKey1,
    lastShuffler,
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
