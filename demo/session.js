import test from 'ava'
import sinon from 'sinon'
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
import { Phase } from 'protocol'
import hexToBytes from 'util/tobytes/hex'
import SessionServerSimulator from 'sim/server/session'
import loadProtocol from 'helper/loadprot'
import Session from 'session'

const attempts = 2
const timeout = 2000
const amount = 5
const fee = 1
const sessionId = hexToBytes('1234')
const poolNumber1 = 3
const poolNumber2 = 7
const poolNumber3 = 9
const signingPrivateKey1 =
  'bf4354ccb69609d3faa567f5c963c8cbf7a51e1e0d52245a3659eba85edfa9cf'
const signingPrivateKey2 =
  '9d7fe9da900eab1dc61f43a6fc56de0f0c825b7bd12ebf026114b128602b72ea'
const signingPrivateKey3 =
  '5c36158d65bce2d2f16272d11af8ec55cc3ee4e14e35f01df5d9d6c88ba0e345'
const shuffler1 =
  '02a531fcc67d22625870997768d81b8d1dce9afb6e9e1b103c443151b736e37217'
const shuffler2 =
  '034db2d72042976e79e39aed8d929cf464759e08d727768ecd96b76e1231711aab'
const shuffler3 =
  '0259cac3388c029f2d1ea0ea7838da00fcbcc0d94a37d2fd59b468e57ed4a91265'
const shufflers = [ shuffler1, shuffler2, shuffler3 ]
/*
const input1 = 'bitcoincash:qq0wfzpsqjxssmxxf76egga37tw547mkpqf9t7zjt9'
const input2 = 'bitcoincash:qrlvvrea0tesymu7hruzhczql0xpx4rt9v2jgvu3ty'
const input3 = 'bitcoincash:qzgw35h5vchh654cylrwqam96p3p0vkxpc4ky0sqvd'
*/
const changeAddress1 = 'bitcoincash:qr6yyd3pkr36mlw5w26n02ajspqjd64h55yv9rdcse'
const changeAddress3 = 'bitcoincash:qqhd4y29fgdujqwhau0aqwgn6vaneaeuevq6lqhh03'
const changeAddresses = new Map([
  [ shuffler1, changeAddress1 ],
  [ shuffler3, changeAddress3 ]
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

class MockTransaction {}

async function run () {
  // Protocol
  const protocol = await loadProtocol()

  // Server
  const server = new SessionServerSimulator(protocol)

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

  // Shuffler 1
  const name1 = 'John'
  const prefix1 = name1 + ': '
  const log1 = new PrefixLogchan(prefix1, logConsole)
  const socket1 = await server.connect(shuffler1)
  const outchanbin1 = new Outchanbin(socket1)
  const outchan1 = new Outchan(outchanbin1, protocol)
  const session1 = new Session()
  const signing1 = new Signing()
  await signing1.restoreKeyPair(signingPrivateKey1)
  const inchanbin1 = new Inchanbin(socket1)
  const inchan1 = new Inchan(inchanbin1, protocol)
  const sessionReceiver1 = new SessionReceiver(shufflers, phases)
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
    poolNumber: poolNumber1,
    signingKeyPair: signing1,
    shufflers,
    changeAddresses,
    amount,
    fee,
    coin: coin1,
    outchan: outchan1,
    receiver: sessionReceiver1,
    log: log1
  })

  // Shuffler 2
  const name2 = 'Mary'
  const prefix2 = name2 + ': '
  const log2 = new PrefixLogchan(prefix2, logConsole)
  const socket2 = await server.connect(shuffler2)
  const outchanbin2 = new Outchanbin(socket2)
  const outchan2 = new Outchan(outchanbin2, protocol)
  const session2 = new Session()
  const signing2 = new Signing()
  await signing2.restoreKeyPair(signingPrivateKey2)
  const inchanbin2 = new Inchanbin(socket2)
  const inchan2 = new Inchan(inchanbin2, protocol)
  const sessionReceiver2 = new SessionReceiver(shufflers, phases)
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
    poolNumber: poolNumber2,
    signingKeyPair: signing2,
    shufflers,
    changeAddresses,
    amount,
    fee,
    coin: coin2,
    outchan: outchan2,
    receiver: sessionReceiver2,
    log: log2
  })

  // Shuffler 3
  const name3 = 'Marduk'
  const prefix3 = name3 + ': '
  const log3 = new PrefixLogchan(prefix3, logConsole)
  const socket3 = await server.connect(shuffler3)
  const outchanbin3 = new Outchanbin(socket3)
  const outchan3 = new Outchan(outchanbin3, protocol)
  const session3 = new Session()
  const signing3 = new Signing()
  await signing3.restoreKeyPair(signingPrivateKey3)
  const inchanbin3 = new Inchanbin(socket3)
  const inchan3 = new Inchan(inchanbin3, protocol)
  const sessionReceiver3 = new SessionReceiver(shufflers, phases)
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
    poolNumber: poolNumber3,
    signingKeyPair: signing3,
    shufflers,
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
