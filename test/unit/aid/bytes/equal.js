import test from 'ava'
import bytesEqual from 'aid/bytes/equal'

test('empty', t => {
  const first = new Uint8Array(0)
  const second = new Uint8Array(0)
  const equal = bytesEqual(first, second)
  t.true(equal)
})

test('inequal different length', t => {
  const first = Uint8Array.from([ 0x01, 0x02 ])
  const second = Uint8Array.from([ 0x01, 0x02, 0x03 ])
  const equal = bytesEqual(first, second)
  t.false(equal)
})

test('inequal same length', t => {
  const first = Uint8Array.from([ 0x01, 0x02, 0x03 ])
  const second = Uint8Array.from([ 0x03, 0x02, 0x01 ])
  const equal = bytesEqual(first, second)
  t.false(equal)
})

test('equal', t => {
  const first = Uint8Array.from([ 0x01, 0x02, 0x03 ])
  const second = Uint8Array.from([ 0x01, 0x02, 0x03 ])
  const equal = bytesEqual(first, second)
  t.true(equal)
})
