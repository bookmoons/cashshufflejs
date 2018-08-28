import test from 'ava'
import undef from 'util/undef'

test('is undefined', t => {
  let undefinedValue
  t.is(undef, undefinedValue)
})

test('not true', t => {
  t.not(undef, true)
})

test('not false', t => {
  t.not(undef, false)
})

test('not null', t => {
  t.not(undef, null)
})

test('not empty string', t => {
  t.not(undef, '')
})
