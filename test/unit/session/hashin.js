import test from 'ava'
import hashInput from 'session/adjunct/hashin'

const key1 = 'KEY1'
const key2 = 'KEY2'
const key3 = 'KEY3'
const output1 = 'OUTPUT1'
const output2 = 'OUTPUT2'
const output3 = 'OUTPUT3'

test('portions', t => {
  const keys = [ key1 ]
  const outputs = [ output1 ]
  const expectedValue = key1 + output1
  const value = hashInput(keys, outputs)
  t.is(value, expectedValue)
})

test('keys', t => {
  const keys = [ key1, key2, key3 ]
  const outputs = []
  const expectedValue = key1 + key2 + key3
  const value = hashInput(keys, outputs)
  t.is(value, expectedValue)
})

test('outputs', t => {
  const keys = []
  const outputs = [ output1, output2, output3 ]
  const expectedValue = output1 + output2 + output3
  const value = hashInput(keys, outputs)
  t.is(value, expectedValue)
})

test('full', t => {
  const keys = [ key1, key2, key3 ]
  const outputs = [ output1, output2, output3 ]
  const expectedValue = key1 + key2 + key3 + output1 + output2 + output3
  const value = hashInput(keys, outputs)
  t.is(value, expectedValue)
})
