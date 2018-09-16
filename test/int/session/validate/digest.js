import test from 'ava'
import { MissingValueError } from 'error'
import hexToBytes from 'util/tobytes/hex'
import validateDigest from 'session/validate/digest'

const dummyDigestString = '987234082750978abcddfebc'
const dummyDigestView = hexToBytes(dummyDigestString)

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
