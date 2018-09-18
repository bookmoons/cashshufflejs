import test from 'ava'
import { readTo } from 'promised-read'
import { PassThrough } from 'stream'
import Crypto from 'crypto/bitcore'
import Outchan from 'outchan/outchanbin'
import Outchanbin from 'outchanbin/nodestream'
import PhaseReceiver from 'receiver/phase'
import Signing from 'signing/bitcore'
import { Phase, terminatorBuffer, terminatorByteLength } from 'protocol'
import { hexToBytes } from 'aid'
import { bytesToBuffer } from 'aid/convert'
import { normalizeProtobufBytes } from 'aid/normalize'
import { ValueError } from 'error'
import loadProtocol from 'helper/loadprot'
import affix from 'session/util/affix'
import decryptOutputList from 'session/adjunct/decrypt'
import encryptLayered from 'session/adjunct/layered'
import gatherShuffleOutput from 'session/gather/shuffleout'
import messageShuffleOutput from 'session/message/shuffleout'
import packageSignedPackets from 'session/util/packs'
import validateShuffleOutput from 'session/validate/shuffleout'
import sign from 'session/util/sign'
import shuffle from 'session/phase/shuffle'

const attempts = 2
const timeout = 500
const sessionIdBytes = hexToBytes('1234')
const sessionId = bytesToBuffer(sessionIdBytes)
const poolNumber = 4
const signingPrivateKey1 =
  '5906456d210ba118d153fde79b74d3806710c979d41b8b38d15c2e8a84d48466'
const signingPrivateKey2 =
  '1d4341f3141fd3a329938d445a9f2fbd83e4faf5ed0d5dc86201782028881f52'
/*
const signingPrivateKey3 =
  '59e0c13c7752db8c63a54d8a111327ed4a3e40ef480107ebc9e9ab5bc2fe9419'
*/
const signingPublicKey1 =
  '03bfe214b2d739c9373900c35f0533fae013f93c6b1eec1fb061a8b3e404f52d90'
const signingPublicKey2 =
  '0350efbed967151d023f4b9a8637fa01328d5851cc6e94f33ccdad659e6ff6ca57'
const signingPublicKey3 =
  '026e41a59fa68163abf6bec552fe48688ad7d342f2c047db7aa6acaf3d447709c5'
const shufflers =
  [ signingPublicKey1, signingPublicKey2, signingPublicKey3 ]
const encryptionPrivateKey1 =
  '32ff3a7363f71e0bc7cfbb36947d219a97d35c7d667bb25ed39b1999e78ac915'
const encryptionPrivateKey2 =
  '13b41346a85e9dfd08b6cc77b15b1a5458d8a0caa7aa804c2c9bb611d812147c'
const encryptionPrivateKey3 =
  '7f7ac27f3970e8232e14c3a800a06659b5a7cee587a4a33efe5c1ec5f1f53512'
const encryptionPublicKey2 =
  '0349357c0c89b0cd913ebdaf74a7ad337727c00b6001204f983efc72a368c4e4aa'
const encryptionPublicKey3 =
  '02c8c46130f5a7d74d95456857fc47c4f6372ca4ae1659595a09e3d99596132130'
const encryptionPublicKeys1 = [ encryptionPublicKey2, encryptionPublicKey3 ]
const encryptionPublicKeys2 = [ encryptionPublicKey3 ]
const output1 =
  'ArtnDVpFV3ICkIqUQJ8ekNMv6+27ngdP4gXgE/YuJhzWKu5CoMdtvUYS9JEnnnrOvqqm' +
  'pfkyOao41+lo1GYwN8k3sppXZcyJfgx5M7lK0AkYzAsf+ffa4tPKhDmaBEjqPBL5szuh' +
  'U0qHpar9HExkJywJSDrbmAl4ZX5XTiQijK6oWjm157hbIYl8x/CNDiqIVhdeThemoJDN' +
  'TOXZVSKP8FBzu6RnXXmNKJvLN+HCnUhLIgDk+c6JWOEd6/cviE7BfEsuDcbygX41pJ3T' +
  '97l6mB/pRHB3FNr6hZRkKsssrRCMv5/ML435Xo+JzLQ+QnQjVvqmr6KGUlcM4cUPcoOe' +
  'czRKChXw8NUWnrfYYqheB5JlyS+zIYhBohXCZpGQfAJ7xg=='
const invalidOutput =
  'ArtnDVpFV3ICkIqUQJ8ekNMv6+27ngdP4gXgE/YuJhzWfvyxkxHrEQhiUVDlTcS4QN/0' +
  'OWZEXfOws1R170zQb8nFsB++XK2YILubW1KPfZ2TFUT/zTKN6xiTXZiZGXm2tJg0p6Cz' +
  'ZZZMs/XZWxiq77klhyXk7tOBHrFJqYHKDEZ2hyQ8epi7EO3bL6pMA4ICloONQ=='
let protocol

const validPacket1 = {
  session: sessionIdBytes,
  number: poolNumber,
  fromKey: { key: signingPublicKey1 },
  toKey: { key: signingPublicKey2 },
  phase: Phase.Shuffle.value,
  message: { str: output1 }
}
const invalidOutputPacket1 = {
  session: sessionIdBytes,
  number: poolNumber,
  fromKey: { key: signingPublicKey1 },
  toKey: { key: signingPublicKey2 },
  phase: Phase.Shuffle.value,
  message: { str: invalidOutput }
}

const testPacketObject1 = {
  session: sessionIdBytes,
  number: poolNumber,
  fromKey: { key: signingPublicKey1 },
  toKey: { key: signingPublicKey2 },
  phase: Phase.Shuffle.value
}
const testSignedObject1 = { packet: testPacketObject1 }
const testPacketsObject1 = { packet: [ testSignedObject1 ] }

const testPacketObject2 = {
  session: sessionIdBytes,
  number: poolNumber,
  fromKey: { key: signingPublicKey2 },
  toKey: { key: signingPublicKey3 },
  phase: Phase.Shuffle.value
}
const testSignedObject2 = { packet: testPacketObject2 }
const testSignedPackets2 = [ testSignedObject2, testSignedObject2 ]
const testPacketsObject2 = { packet: testSignedPackets2 }

function produceSession () {
  const session = {
    affix,
    decryptOutputList,
    encryptLayered,
    gatherShuffleOutput,
    messageShuffleOutput,
    packageSignedPackets,
    validateShuffleOutput,
    sign,
    shuffle
  }
  return session
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
  const observedToKey = observed.toKey
  const expectedToKey = expected.toKey
  t.is(observedToKey.key, expectedToKey.key)
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

test('return first', async t => {
  const session = produceSession()
  const signing = new Signing()
  await signing.restoreKeyPair(signingPrivateKey1)
  const crypto = new Crypto()
  await crypto.restoreKeyPair(encryptionPrivateKey1)
  const outputStream = new PassThrough()
  const outchanbin = new Outchanbin(outputStream)
  const outchan = new Outchan(outchanbin, protocol)
  const receiver = new PhaseReceiver(shufflers)
  const { outputKeyPair } = await session.shuffle({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber,
    signingKeyPair: signing,
    first: true,
    last: false,
    precedingShufflersCount: 0,
    priorShuffler: null,
    nextShuffler: signingPublicKey2,
    encryptionPublicKeys: encryptionPublicKeys1,
    crypto,
    outchan,
    receiver
  })
  t.true(outputKeyPair instanceof Signing)
})

test('return inner', async t => {
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
  const inbox = inboxes.get(signingPublicKey1)
  inbox.add(validPacket1)
  const { outputKeyPair } = await session.shuffle({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber,
    signingKeyPair: signing,
    first: false,
    last: false,
    precedingShufflersCount: 1,
    priorShuffler: signingPublicKey1,
    nextShuffler: signingPublicKey3,
    encryptionPublicKeys: encryptionPublicKeys2,
    crypto,
    outchan,
    receiver
  })
  t.true(outputKeyPair instanceof Signing)
})

test('return last', async t => {
  const session = produceSession()
  const signing = new Signing()
  await signing.restoreKeyPair(signingPrivateKey2)
  const crypto = new Crypto()
  await crypto.restoreKeyPair(encryptionPrivateKey2)
  const outputStream = new PassThrough()
  const outchanbin = new Outchanbin(outputStream)
  const outchan = new Outchan(outchanbin, protocol)
  const receiver = new PhaseReceiver(shufflers)
  const { outputKeyPair } = await session.shuffle({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber,
    signingKeyPair: signing,
    first: false,
    last: true,
    precedingShufflersCount: 2,
    priorShuffler: signingPublicKey2,
    nextShuffler: null,
    encryptionPublicKeys: [],
    crypto,
    outchan,
    receiver
  })
  t.true(outputKeyPair instanceof Signing)
})

test('output first', async t => {
  const session = produceSession()
  const signing = new Signing()
  await signing.restoreKeyPair(signingPrivateKey1)
  const crypto = new Crypto()
  await crypto.restoreKeyPair(encryptionPrivateKey1)
  const outputStream = new PassThrough()
  const outchanbin = new Outchanbin(outputStream)
  const outchan = new Outchan(outchanbin, protocol)
  const receiver = new PhaseReceiver(shufflers)
  await session.shuffle({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber,
    signingKeyPair: signing,
    first: true,
    last: false,
    precedingShufflersCount: 0,
    priorShuffler: null,
    nextShuffler: signingPublicKey2,
    encryptionPublicKeys: encryptionPublicKeys1,
    crypto,
    outchan,
    receiver
  })
  const frameBuffer = await readTo(outputStream, terminatorBuffer)
  const messageLength = frameBuffer.length - terminatorByteLength
  const messageBuffer = frameBuffer.slice(0, messageLength)
  const packets = protocol.Packets.decode(messageBuffer)
  const packetsObject = protocol.Packets.toObject(packets)
  verifyEqualPackets(t, packetsObject, testPacketsObject1)
  const signedPacketObjects = packetsObject.packet
  t.is(signedPacketObjects.length, 1)
  const crypto2 = new Crypto()
  await crypto2.restoreKeyPair(encryptionPrivateKey2)
  await t.notThrowsAsync(async () => {
    for (const signedPacketObject of signedPacketObjects) {
      const packetObject = signedPacketObject.packet
      const messageObject = packetObject.message
      const outputItem = messageObject.str
      await crypto2.decrypt(outputItem)
    }
  })
})

test('output inner', async t => {
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
  const inbox = inboxes.get(signingPublicKey1)
  inbox.add(validPacket1)
  await session.shuffle({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber,
    signingKeyPair: signing,
    first: false,
    last: false,
    precedingShufflersCount: 1,
    priorShuffler: signingPublicKey1,
    nextShuffler: signingPublicKey3,
    encryptionPublicKeys: encryptionPublicKeys2,
    crypto,
    outchan,
    receiver
  })
  const frameBuffer = await readTo(outputStream, terminatorBuffer)
  const messageLength = frameBuffer.length - terminatorByteLength
  const messageBuffer = frameBuffer.slice(0, messageLength)
  const packets = protocol.Packets.decode(messageBuffer)
  const packetsObject = protocol.Packets.toObject(packets)
  verifyEqualPackets(t, packetsObject, testPacketsObject2)
  const signedPacketObjects = packetsObject.packet
  t.is(signedPacketObjects.length, 2)
  const crypto3 = new Crypto()
  await crypto3.restoreKeyPair(encryptionPrivateKey3)
  await t.notThrowsAsync(async () => {
    for (const signedPacketObject of signedPacketObjects) {
      const packetObject = signedPacketObject.packet
      const messageObject = packetObject.message
      const outputItem = messageObject.str
      await crypto3.decrypt(outputItem)
    }
  })
})

test('decrypt failure', async t => {
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
  const inbox = inboxes.get(signingPublicKey1)
  inbox.add(invalidOutputPacket1)
  const shufflePromise = session.shuffle({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber,
    signingKeyPair: signing,
    first: false,
    last: false,
    precedingShufflersCount: 1,
    priorShuffler: signingPublicKey1,
    nextShuffler: signingPublicKey2,
    encryptionPublicKeys: encryptionPublicKeys2,
    crypto,
    outchan,
    receiver
  })
  try {
    await shufflePromise
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof ValueError)
    t.true(e.message.startsWith('decryption failure'))
  }
})

test('duplicate items', async t => {
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
  const inbox = inboxes.get(signingPublicKey1)
  inbox.add(validPacket1)
  inbox.add(validPacket1)
  const shufflePromise = session.shuffle({
    protocol,
    attempts,
    timeout,
    sessionId,
    poolNumber,
    signingKeyPair: signing,
    first: false,
    last: false,
    precedingShufflersCount: 2,
    priorShuffler: signingPublicKey1,
    nextShuffler: signingPublicKey2,
    encryptionPublicKeys: encryptionPublicKeys2,
    crypto,
    outchan,
    receiver
  })
  try {
    await shufflePromise
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof ValueError)
    t.is(e.message, 'output list duplicates')
  }
})
