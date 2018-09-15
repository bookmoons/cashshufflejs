import test from 'ava'
import CustomQueue from 'queue/custom/main'
import process from 'queue/custom/process'
import privs from 'queue/custom/privs'

const testMessage1 = 'Test message 1'
const testMessage2 = 'Test message 2'

test('1 item', async t => {
  const output = []
  function processor (data) { output.push(data) }
  const queue = new CustomQueue(processor)
  const priv = privs.get(queue)
  priv.buffer.push(testMessage1)
  await process.call(queue)
  const output1 = output.shift()
  t.is(output1, testMessage1)
})

test('2 items', async t => {
  const output = []
  function processor (data) { output.push(data) }
  const queue = new CustomQueue(processor)
  const priv = privs.get(queue)
  priv.buffer.push(testMessage1)
  priv.buffer.push(testMessage2)
  await process.call(queue)
  const output1 = output.shift()
  t.is(output1, testMessage1)
  const output2 = output.shift()
  t.is(output2, testMessage2)
})
