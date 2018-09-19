import test from 'ava'
import bytesAt from 'aid/bytes/at'

test('both empty', t => {
  const container = new Uint8Array(0)
  const value = new Uint8Array(0)
  const matched = bytesAt(container, value, 0)
  t.false(matched)
})

test('empty container', t => {
  const container = new Uint8Array(0)
  const value = Uint8Array.from([ 0x01 ])
  const matched = bytesAt(container, value, 0)
  t.false(matched)
})

test('empty value', t => {
  const container = Uint8Array.from([ 0x0a ])
  const value = new Uint8Array(0)
  const matched = bytesAt(container, value, 0)
  t.false(matched)
})

test('beyond end', t => {
  const container = Uint8Array.from([ 0x0a ])
  const value = Uint8Array.from([ 0x0a ])
  const matched = bytesAt(container, value, 1)
  t.false(matched)
})

test('crosses end', t => {
  const container = Uint8Array.from([ 0x0a ])
  const value = Uint8Array.from([ 0x01, 0x02 ])
  const matched = bytesAt(container, value, 0)
  t.false(matched)
})

test('different full', t => {
  const container = Uint8Array.from([ 0x01, 0x02, 0x03 ])
  const value = Uint8Array.from([ 0x01, 0x02, 0xff ])
  const matched = bytesAt(container, value, 0)
  t.false(matched)
})

test('different front', t => {
  const container = Uint8Array.from([ 0x01, 0x02, 0x03, 0x04, 0x05 ])
  const value = Uint8Array.from([ 0x01, 0x02, 0xff ])
  const matched = bytesAt(container, value, 0)
  t.false(matched)
})

test('different middle', t => {
  const container = Uint8Array.from([ 0x01, 0x02, 0x03, 0x04, 0x05 ])
  const value = Uint8Array.from([ 0x02, 0x03, 0xff ])
  const matched = bytesAt(container, value, 1)
  t.false(matched)
})

test('different back', t => {
  const container = Uint8Array.from([ 0x01, 0x02, 0x03, 0x04, 0x05 ])
  const value = Uint8Array.from([ 0x03, 0x04, 0xff ])
  const matched = bytesAt(container, value, 2)
  t.false(matched)
})

test('same full', t => {
  const container = Uint8Array.from([ 0x01, 0x02, 0x03 ])
  const value = Uint8Array.from([ 0x01, 0x02, 0x03 ])
  const matched = bytesAt(container, value, 0)
  t.true(matched)
})

test('same front', t => {
  const container = Uint8Array.from([ 0x01, 0x02, 0x03, 0x04, 0x05 ])
  const value = Uint8Array.from([ 0x01, 0x02, 0x03 ])
  const matched = bytesAt(container, value, 0)
  t.true(matched)
})

test('same middle', t => {
  const container = Uint8Array.from([ 0x01, 0x02, 0x03, 0x04, 0x05 ])
  const value = Uint8Array.from([ 0x02, 0x03, 0x04 ])
  const matched = bytesAt(container, value, 1)
  t.true(matched)
})

test('same back', t => {
  const container = Uint8Array.from([ 0x01, 0x02, 0x03, 0x04, 0x05 ])
  const value = Uint8Array.from([ 0x03, 0x04, 0x05 ])
  const matched = bytesAt(container, value, 2)
  t.true(matched)
})
