import test from 'ava'
import sinon from 'sinon'
import { PassThrough, Transform } from 'stream'
import AuthenticateReceiver from 'receiver/authenticate'
import ConsoleLogchan from 'logchan/console'
import Drawer from 'drawer/standard'
import Inchan from 'inchan/inchanbin'
import Inchanbin from 'inchanbin/nodestream'
import ObjectifyReceiver from 'receiver/objectify'
import Outchan from 'outchan/outchanbin'
import Outchanbin from 'outchanbin/nodestream'
import PacketifyReceiver from 'receiver/packetify'
import PrefixLogchan from 'logchan/prefix'
import SessionReceiver from 'receiver/session'
import Signing from 'signing/bitcore'
import { Phase, terminatorBuffer, terminatorByteLength } from 'protocol'
import toArrayBuffer from 'util/toarraybuffer'
import loadProtocol from 'helper/loadprot'
import Session from 'session'

const attempts = 2
const timeout = 2000
const amount = 5
const fee = 1
const sessionId = toArrayBuffer(Buffer.from('123'))
const participantNumber1 = 3
const participantNumber2 = 7
const participantNumber3 = 9
const signingPrivateKey1 =
  'bf4354ccb69609d3faa567f5c963c8cbf7a51e1e0d52245a3659eba85edfa9cf'
const signingPrivateKey2 =
  '9d7fe9da900eab1dc61f43a6fc56de0f0c825b7bd12ebf026114b128602b72ea'
const signingPrivateKey3 =
  '5c36158d65bce2d2f16272d11af8ec55cc3ee4e14e35f01df5d9d6c88ba0e345'
const participant1 =
  '02a531fcc67d22625870997768d81b8d1dce9afb6e9e1b103c443151b736e37217'
const participant2 =
  '034db2d72042976e79e39aed8d929cf464759e08d727768ecd96b76e1231711aab'
const participant3 =
  '0259cac3388c029f2d1ea0ea7838da00fcbcc0d94a37d2fd59b468e57ed4a91265'
const participants = [ participant1, participant2, participant3 ]
/*
const input1 = 'bitcoincash:qq0wfzpsqjxssmxxf76egga37tw547mkpqf9t7zjt9'
const input2 = 'bitcoincash:qrlvvrea0tesymu7hruzhczql0xpx4rt9v2jgvu3ty'
const input3 = 'bitcoincash:qzgw35h5vchh654cylrwqam96p3p0vkxpc4ky0sqvd'
*/
const changeAddress1 = 'bitcoincash:qr6yyd3pkr36mlw5w26n02ajspqjd64h55yv9rdcse'
const changeAddress3 = 'bitcoincash:qqhd4y29fgdujqwhau0aqwgn6vaneaeuevq6lqhh03'
const changeAddresses = new Map([
  [ participant1, changeAddress1 ],
  [ participant3, changeAddress3 ]
])
const phaseAnnounce = Phase.Announcement.value
const phaseShuffle = Phase.Shuffle.value
const phaseOutput = Phase.Broadcast.value
const phaseEquivocation = Phase.EquivocationCheck.value
const phaseSubmit = Phase.VerificationSubmission.value
const phaseBlame = Phase.Blame.value
const phases = [
  phaseAnnounce,
  phaseShuffle,
  phaseOutput,
  phaseEquivocation,
  phaseSubmit,
  phaseBlame
]
const inputSignatures1 = new Map([
  [ '1', '1234' ],
  [ '2', '5678' ]
])
const inputSignatures2 = new Map([
  [ '3', 'ABCD' ]
])
const inputSignatures3 = new Map([
  [ '4', 'EFEF' ],
  [ '5', '9090' ],
  [ '6', '6767' ]
])

class ServerDecoder extends Transform {
  constructor (protocol) {
    super({
      readableObjectMode: true
    })
    this.protocol = protocol
    this.buffer = Buffer.from([])
  }

  _transform (chunk, encoding, callback) {
    this.buffer = Buffer.concat([ this.buffer, chunk ])
    const index = this.buffer.indexOf(terminatorBuffer)
    if (index !== -1) {
      const finalIndex = index + terminatorByteLength - 1
      const frameLength = finalIndex + 1
      const frameBuffer = this.buffer.slice(0, frameLength)
      const nextIndex = finalIndex + 1
      this.buffer =
        this.buffer.length >= nextIndex
          ? this.buffer.slice(nextIndex)
          : Buffer.from([])
      const messageLength = frameLength - terminatorByteLength
      const messageBuffer = frameBuffer.slice(0, messageLength)
      const packets = this.protocol.Packets.decode(messageBuffer)
      this.push(packets)
    }
    callback()
  }
}

class ServerExtractor extends Transform {
  constructor () {
    super({
      objectMode: true
    })
  }

  _transform (packets, encoding, callback) {
    const signed = packets.packet[0]
    this.push(signed)
    callback()
  }
}

class ServerEncoder extends Transform {
  constructor (protocol) {
    super({
      writableObjectMode: true
    })
    this.protocol = protocol
  }

  _transform (signed, encoding, callback) {
    const signedEncoded = this.protocol.Signed.encode(signed).finish()
    const signedBuffer = Buffer.from(signedEncoded)
    const signedFrame = Buffer.concat([ signedBuffer, terminatorBuffer ])
    this.push(signedFrame)
    callback()
  }
}

class MockTransaction {}

async function run () {
  // Protocol
  const protocol = await loadProtocol()

  // Mock server
  const serverExtractor = new ServerExtractor()
  const serverEncoder = new ServerEncoder(protocol)
  serverExtractor.pipe(serverEncoder)

  // Coin
  const transaction = new MockTransaction()
  const coin = {
    addTransactionSignatures: sinon.stub().returns(transaction),
    broadcastTransaction: sinon.stub(),
    makeUnsignedTransaction: sinon.stub().returns(transaction),
    sufficientFunds: sinon.stub().returns(true),
    verifyTransactionSignature: sinon.stub().returns(true)
  }
  const coin1 = {
    signTransactionInputs: sinon.stub().returns(inputSignatures1)
  }
  Object.assign(coin1, coin)
  const coin2 = {
    signTransactionInputs: sinon.stub().returns(inputSignatures2)
  }
  Object.assign(coin2, coin)
  const coin3 = {
    signTransactionInputs: sinon.stub().returns(inputSignatures3)
  }
  Object.assign(coin3, coin)

  // Logging channel
  const logConsole = new ConsoleLogchan()

  // Participant 1
  const name1 = 'John'
  const prefix1 = name1 + ': '
  const log1 = new PrefixLogchan(prefix1, logConsole)
  const serverDecoder1 = new ServerDecoder(protocol)
  serverDecoder1.pipe(serverExtractor)
  const outputStream1 = new PassThrough()
  outputStream1.pipe(serverDecoder1)
  const outchanbin1 = new Outchanbin(outputStream1)
  const outchan1 = new Outchan(outchanbin1, protocol)
  const session1 = new Session()
  const signing1 = new Signing()
  await signing1.restoreKeyPair(signingPrivateKey1)
  const inputStream1 = new PassThrough()
  serverEncoder.pipe(inputStream1)
  const inchanbin1 = new Inchanbin(inputStream1)
  const inchan1 = new Inchan(inchanbin1, protocol)
  const sessionReceiver1 = new SessionReceiver(participants, phases)
  const objectifyReceiver1 = new ObjectifyReceiver(
    protocol,
    sessionReceiver1
  )
  const packetifyReceiver1 = new PacketifyReceiver(
    protocol,
    objectifyReceiver1
  )
  const authenticateReceiver1 = new AuthenticateReceiver({
    protocol,
    nextReceiver: packetifyReceiver1
  })
  const drawer1 = new Drawer(inchan1, authenticateReceiver1)
  await drawer1.start()
  const runPromise1 = session1.run({
    protocol,
    attempts,
    timeout,
    sessionId,
    participantNumber: participantNumber1,
    signingKeyPair: signing1,
    participants,
    changeAddresses,
    amount,
    fee,
    coin: coin1,
    outchan: outchan1,
    receiver: sessionReceiver1,
    log: log1
  })

  // Participant 2
  const name2 = 'Mary'
  const prefix2 = name2 + ': '
  const log2 = new PrefixLogchan(prefix2, logConsole)
  const serverDecoder2 = new ServerDecoder(protocol)
  serverDecoder2.pipe(serverExtractor)
  const outputStream2 = new PassThrough()
  outputStream2.pipe(serverDecoder2)
  const outchanbin2 = new Outchanbin(outputStream2)
  const outchan2 = new Outchan(outchanbin2, protocol)
  const session2 = new Session()
  const signing2 = new Signing()
  await signing2.restoreKeyPair(signingPrivateKey2)
  const inputStream2 = new PassThrough()
  serverEncoder.pipe(inputStream2)
  const inchanbin2 = new Inchanbin(inputStream2)
  const inchan2 = new Inchan(inchanbin2, protocol)
  const sessionReceiver2 = new SessionReceiver(participants, phases)
  const objectifyReceiver2 = new ObjectifyReceiver(
    protocol,
    sessionReceiver2
  )
  const packetifyReceiver2 = new PacketifyReceiver(
    protocol,
    objectifyReceiver2
  )
  const authenticateReceiver2 = new AuthenticateReceiver({
    protocol,
    nextReceiver: packetifyReceiver2
  })
  const drawer2 = new Drawer(inchan2, authenticateReceiver2)
  await drawer2.start()
  const runPromise2 = session2.run({
    protocol,
    attempts,
    timeout,
    sessionId,
    participantNumber: participantNumber2,
    signingKeyPair: signing2,
    participants,
    changeAddresses,
    amount,
    fee,
    coin: coin2,
    outchan: outchan2,
    receiver: sessionReceiver2,
    log: log2
  })

  // Participant 3
  const name3 = 'Marduk'
  const prefix3 = name3 + ': '
  const log3 = new PrefixLogchan(prefix3, logConsole)
  const serverDecoder3 = new ServerDecoder(protocol)
  serverDecoder3.pipe(serverExtractor)
  const outputStream3 = new PassThrough()
  outputStream3.pipe(serverDecoder3)
  const outchanbin3 = new Outchanbin(outputStream3)
  const outchan3 = new Outchan(outchanbin3, protocol)
  const session3 = new Session()
  const signing3 = new Signing()
  await signing3.restoreKeyPair(signingPrivateKey3)
  const inputStream3 = new PassThrough()
  serverEncoder.pipe(inputStream3)
  const inchanbin3 = new Inchanbin(inputStream3)
  const inchan3 = new Inchan(inchanbin3, protocol)
  const sessionReceiver3 = new SessionReceiver(participants, phases)
  const objectifyReceiver3 = new ObjectifyReceiver(
    protocol,
    sessionReceiver3
  )
  const packetifyReceiver3 = new PacketifyReceiver(
    protocol,
    objectifyReceiver3
  )
  const authenticateReceiver3 = new AuthenticateReceiver({
    protocol,
    nextReceiver: packetifyReceiver3
  })
  const drawer3 = new Drawer(inchan3, authenticateReceiver3)
  await drawer3.start()
  const runPromise3 = session3.run({
    protocol,
    attempts,
    timeout,
    sessionId,
    participantNumber: participantNumber3,
    signingKeyPair: signing3,
    participants,
    changeAddresses,
    amount,
    fee,
    coin: coin3,
    outchan: outchan3,
    receiver: sessionReceiver3,
    log: log3
  })

  return Promise.all([
    runPromise1,
    runPromise2,
    runPromise3
  ])
}

test('demo:session', async t => {
  t.pass()
  await run()
})
