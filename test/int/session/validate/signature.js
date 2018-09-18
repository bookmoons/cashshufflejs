import test from 'ava'
import Long from 'long'
import { MissingValueError } from 'error'
import hexToBytes from 'aid/tobytes/hex'
import validateSignature from 'session/validate/signature'

test('missing message', async t => {
  const packet = {}
  try {
    await validateSignature(packet)
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'message')
  }
})

test('missing signatures', async t => {
  const packet = { message: {} }
  try {
    await validateSignature(packet)
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'message.signatures')
  }
})

test('missing signature [0]', async t => {
  const index = Long.fromString('1', true, 10)
  const signature = {}
  const inputSignature = { index, signature }
  const inputSignatures = [ inputSignature ]
  const message = { signatures: inputSignatures }
  const packet = { message }
  try {
    await validateSignature(packet)
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'message.signatures.signature.signature')
  }
})

test('missing signature [1]', async t => {
  const index1 = Long.fromString('1', true, 10)
  const signature1 = hexToBytes('1234')
  const signatureObject1 = { signature: signature1 }
  const inputSignature1 = { index: index1, signature: signatureObject1 }
  const index2 = Long.fromString('2', true, 10)
  const signatureObject2 = {}
  const inputSignature2 = { index: index2, signature: signatureObject2 }
  const inputSignatures = [ inputSignature1, inputSignature2 ]
  const message = { signatures: inputSignatures }
  const packet = { message }
  try {
    await validateSignature(packet)
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'message.signatures.signature.signature')
  }
})

test('valid', async t => {
  const index1 = Long.fromString('1', true, 10)
  const signature1 = hexToBytes('1234')
  const signatureObject1 = { signature: signature1 }
  const inputSignature1 = { index: index1, signature: signatureObject1 }
  const index2 = Long.fromString('2', true, 10)
  const signature2 = hexToBytes('5678')
  const signatureObject2 = { signature: signature2 }
  const inputSignature2 = { index: index2, signature: signatureObject2 }
  const inputSignatures = [ inputSignature1, inputSignature2 ]
  const message = { signatures: inputSignatures }
  const packet = { message }
  await t.notThrowsAsync(async () => {
    await validateSignature(packet)
  })
})
