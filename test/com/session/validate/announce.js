import test from 'ava'
import { MissingValueError, ValueError } from 'error'
import validateAnnounce from 'session/validate/announce'

const testPublicKey =
  '02c641c88bd7c40b7c5b3eb7bdd593b32a0252e1024879e03580651ba22476e727'

test('missing message', async t => {
  const packet = {}
  try {
    await validateAnnounce(packet)
    t.fail('Incorrect succesful validation')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'message')
  }
})

test('missing message.key', async t => {
  const packet = { message: {} }
  try {
    await validateAnnounce(packet)
    t.fail('Incorrect successful validation')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'message.key')
  }
})

test('missing message.key.key', async t => {
  const packet = { message: { key: {} } }
  try {
    await validateAnnounce(packet)
    t.fail('Incorrect successful validation')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'message.key.key')
  }
})

test('invalid key', async t => {
  const packet = { message: { key: { key: 'invalid key' } } }
  try {
    await validateAnnounce(packet)
    t.fail('Incorrect successful validation')
  } catch (e) {
    t.true(e instanceof ValueError)
    t.is(e.message, 'invalid key')
  }
})

test('valid key', async t => {
  const packet = { message: { key: { key: testPublicKey } } }
  await t.notThrowsAsync(async () => {
    await validateAnnounce(packet)
  })
})
