import test from 'ava'
import loadProtocol from 'helper/loadprot'
import bitcore from 'bitcore-lib-cash'
import Message from '@bookmoons/bitcore-message-cash'
import {
  bytesToHex,
  normalizeProtobufBytes
} from '../../../../src/aid'
import Signing from 'signing/bitcore'
import sign from 'session/util/sign'

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
  const signing = new Signing()
  await signing.restoreKeyPair(signingPrivateKey)
  const testPacket = protocol.Packet.fromObject(testPacketObject)
  const signature = await sign(signing, testPacket, protocol.Packet)
  const testPacketBytesDenormal =
    protocol.Packet.encode(testPacket).finish()
  const testPacketBytes = normalizeProtobufBytes(testPacketBytesDenormal)
  const testPacketHex = bytesToHex(testPacketBytes)
  const testPacketSigner = new Message(testPacketHex)
  const privateKey = new bitcore.PrivateKey(signingPrivateKey)
  const publicKey = new bitcore.PublicKey(privateKey)
  const address = publicKey.toAddress()
  const valid = testPacketSigner.verify(address, signature)
  t.true(valid)
})
