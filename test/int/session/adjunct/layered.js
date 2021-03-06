import test from 'ava'
import Crypto from 'crypto/bitcore'
import {
  cryptDecodeBytes,
  cryptDecodeString,
  cryptEncodeString
} from 'aid/code'
import { hexToBytes } from 'aid/convert'
import encryptLayered from 'session/adjunct/layered'

const testMessage = 'bitcoincash:qpeuavv8256ce3dte2znha05ytjzajztx548p3c7ca'
const testMessageEncoded = cryptEncodeString(testMessage)
const ownPrivateKeyHex =
  '60932db7a5f192e3973e754d31d491d0fc33324cc48d481c6333035a5d471a73'
const privateKey1Hex =
  '897095243bf24b52de2aafc86cbe55772b3d8f2687b85c1209ad86a7be8f9ddc'
const privateKey2Hex =
  'bbf4ae924b160d1144e32d8946670d154cf43de92333861d771772b9d9d71397'
const privateKey3Hex =
  '3d7dd073c2fe1f89aabb920d4caac3c1099b2f9b7db8defb43dcc1da33cc7038'
const ownPrivateKey = hexToBytes(ownPrivateKeyHex)
const privateKey1 = hexToBytes(privateKey1Hex)
const privateKey2 = hexToBytes(privateKey2Hex)
const privateKey3 = hexToBytes(privateKey3Hex)
const publicKey1Hex =
  '03fe2e132190de7a26a4e33306fbec43538d33f3bb09fa236f03da62ef21daa285'
const publicKey2Hex =
  '03a2f0652372e87d17bc84819cf67e1dec350f45ddccfcb152c2c69051b7c3bfba'
const publicKey3Hex =
  '024142f0b7d9e7586223b7c71de23fab51d796882f81785265d5e3bc2fce2e21ae'
const publicKey1 = hexToBytes(publicKey1Hex)
const publicKey2 = hexToBytes(publicKey2Hex)
const publicKey3 = hexToBytes(publicKey3Hex)
const publicKeys = [ publicKey1, publicKey2, publicKey3 ]

test('encrypt', async t => {
  const ownCrypto = new Crypto()
  await ownCrypto.restoreKeyPair(ownPrivateKey)
  const crypto1 = new Crypto()
  await crypto1.restoreKeyPair(privateKey1)
  const crypto2 = new Crypto()
  await crypto2.restoreKeyPair(privateKey2)
  const crypto3 = new Crypto()
  await crypto3.restoreKeyPair(privateKey3)
  const cryptogram3 = await encryptLayered(
    ownCrypto,
    testMessageEncoded,
    publicKeys
  )
  const cryptogram2Encoded = await crypto3.decrypt(cryptogram3)
  const cryptogram2 = cryptDecodeBytes(cryptogram2Encoded)
  const cryptogram1Encoded = await crypto2.decrypt(cryptogram2)
  const cryptogram1 = cryptDecodeBytes(cryptogram1Encoded)
  const messageEncoded = await crypto1.decrypt(cryptogram1)
  const message = cryptDecodeString(messageEncoded)
  t.is(message, testMessage)
})
