import test from 'ava'
import CustomQueue from 'queue/custom/main'
import processItem from 'queue/custom/item'
import privs from 'queue/custom/privs'

test('1 item', async t => {
  const output = []
  function processor (data) { output.push(data) }
  const queue = new CustomQueue(processor)
  const priv = privs.get(queue)
  const data = 'Test message'
  priv.buffer.push(data)
  await processItem.call(queue)
  const output1 = output.shift()
  t.is(output1, data)
})

test('2 items', async t => {
  const output = []
  function processor (data) { output.push(data) }
  const queue = new CustomQueue(processor)
  const priv = privs.get(queue)
  const data1 = 'Test message 1'
  priv.buffer.push(data1)
  const data2 = 'Test message 2'
  priv.buffer.push(data2)
  await processItem.call(queue)
  await processItem.call(queue)
  const output1 = output.shift()
  t.is(output1, data1)
  const output2 = output.shift()
  t.is(output2, data2)
})
