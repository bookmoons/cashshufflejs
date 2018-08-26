import test from 'ava'
import loadProtocol from 'helper/loadprot'
import bitcore from 'bitcore-lib-cash'
import Message from '@bookmoons/bitcore-message-cash'
import Signing from 'signing/bitcore'
import privs from 'session/privs'
import sign from 'session/sign'
import signPacket from 'session/signpack'

const signingPrivateKey =
  'ad6110ba1413c6b9f4f1538c86fd5809e8a7e638905a75c95ade5d02afb54931'
const testKey = 'Test key'
const testPacketObject = {
  fromKey: {
    key: testKey
  }
}
let protocol

test.before(async t => {
  protocol = await loadProtocol()
})

test('sign', async t => {
  const session = {
    sign,
    signPacket
  }
  privs.set(session, {
    protocol
  })
  const signing = new Signing()
  await signing.restoreKeyPair(signingPrivateKey)
  const testPacket = protocol.Packet.fromObject(testPacketObject)
  const signature = await session.signPacket(signing, testPacket)
  const testPacketEncoded = protocol.Packet.encode(testPacket).finish()
  // Normalize to Buffer
  const testPacketEncodedBuffer = Buffer.from(testPacketEncoded)
  const testPacketEncodedString = testPacketEncodedBuffer.toString('hex')
  const testPacketSigner = new Message(testPacketEncodedString)
  const privateKey = new bitcore.PrivateKey(signingPrivateKey)
  const publicKey = new bitcore.PublicKey(privateKey)
  const address = publicKey.toAddress()
  const valid = testPacketSigner.verify(address, signature)
  t.true(valid)
})
