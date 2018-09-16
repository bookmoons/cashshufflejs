import test from 'ava'
import bytesToHex from 'util/tohex/bytes'

const testBytesEmpty = new Uint8Array(0)
const expectedHexEmpty = ''
const testBytes = Uint8Array.from([ 0x07, 0xda, 0x8F ])
const expectedHex = '07da8f'

test('empty', t => {
  const hex = bytesToHex(testBytesEmpty)
  t.is(hex, expectedHexEmpty)
})

test('nonempty', t => {
  const hex = bytesToHex(testBytes)
  t.is(hex.toLowerCase(), expectedHex)
})
