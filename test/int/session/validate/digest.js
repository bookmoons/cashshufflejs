import test from 'ava'
import { MissingValueError } from 'error'
import toArrayBuffer from 'util/toarraybuffer'
import validateDigest from 'session/validate/digest'

const dummyDigestString = '987234082750978abcddfebc'
const dummyDigestBuffer = Buffer.from(dummyDigestString, 'hex')
const dummyDigest = toArrayBuffer(dummyDigestBuffer)
const dummyDigestView = new Uint8Array(dummyDigest)

test('missing message', async t => {
  const packet = {}
  try {
    await validateDigest(packet)
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'message')
  }
})

test('missing message.hash', async t => {
  const packet = { message: {} }
  try {
    await validateDigest(packet)
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'message.hash')
  }
})

test('missing message.hash.hash', async t => {
  const packet = { message: { hash: {} } }
  try {
    await validateDigest(packet)
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'message.hash.hash')
  }
})

test('valid', async t => {
  const packet = { message: { hash: { hash: dummyDigestView } } }
  await t.notThrowsAsync(async () => {
    await validateDigest(packet)
  })
})
