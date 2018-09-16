import test from 'ava'
import { FormatError } from 'error'
import hexToBytes from 'util/tobytes/hex'

const testHexEmpty = ''
const expectedBytesEmpty = new Uint8Array(0)
const testHexValid = '1234defb'
const expectedBytesValid = Uint8Array.from([ 0x12, 0x34, 0xde, 0xfb ])
const testBadLength = '123'
const testBadByte = '1234ZZ'

test('empty', t => {
  const bytes = hexToBytes(testHexEmpty)
  t.deepEqual(bytes, expectedBytesEmpty)
})

test('valid', t => {
  const bytes = hexToBytes(testHexValid)
  t.deepEqual(bytes, expectedBytesValid)
})

test('odd length', t => {
  try {
    hexToBytes(testBadLength)
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof FormatError)
    t.is(e.message, 'invalid string length')
  }
})

test('bad byte', t => {
  try {
    hexToBytes(testBadByte)
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof FormatError)
    t.is(e.message, 'invalid hex byte')
  }
})
