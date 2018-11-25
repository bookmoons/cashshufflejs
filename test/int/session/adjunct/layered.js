import test from 'ava'
import Crypto from 'crypto/bitcore'
import { bytesToBase64 } from 'aid/convert'
import encryptLayered from 'session/adjunct/layered'

const testMessage = 'bitcoincash:qpeuavv8256ce3dte2znha05ytjzajztx548p3c7ca'
const ownPrivateKeyString =
  '60932db7a5f192e3973e754d31d491d0fc33324cc48d481c6333035a5d471a73'
const privateKeyString1 =
  '897095243bf24b52de2aafc86cbe55772b3d8f2687b85c1209ad86a7be8f9ddc'
const privateKeyString2 =
  'bbf4ae924b160d1144e32d8946670d154cf43de92333861d771772b9d9d71397'
const privateKeyString3 =
  '3d7dd073c2fe1f89aabb920d4caac3c1099b2f9b7db8defb43dcc1da33cc7038'
const publicKeyString1 =
  '03fe2e132190de7a26a4e33306fbec43538d33f3bb09fa236f03da62ef21daa285'
const publicKeyString2 =
  '03a2f0652372e87d17bc84819cf67e1dec350f45ddccfcb152c2c69051b7c3bfba'
const publicKeyString3 =
  '024142f0b7d9e7586223b7c71de23fab51d796882f81785265d5e3bc2fce2e21ae'
const publicKeys = [ publicKeyString1, publicKeyString2, publicKeyString3 ]

test('encrypt', async t => {
  const ownCrypto = new Crypto()
  await ownCrypto.restoreKeyPair(ownPrivateKeyString)
  const crypto1 = new Crypto()
  await crypto1.restoreKeyPair(privateKeyString1)
  const crypto2 = new Crypto()
  await crypto2.restoreKeyPair(privateKeyString2)
  const crypto3 = new Crypto()
  await crypto3.restoreKeyPair(privateKeyString3)
  const cryptogram3Bytes =
    await encryptLayered(ownCrypto, testMessage, publicKeys)
  const cryptogram3 = bytesToBase64(cryptogram3Bytes)
  const cryptogram2 = await crypto3.decryptString(cryptogram3)
  const cryptogram1 = await crypto2.decryptString(cryptogram2)
  const message = await crypto1.decryptString(cryptogram1)
  t.is(message, testMessage)
})
