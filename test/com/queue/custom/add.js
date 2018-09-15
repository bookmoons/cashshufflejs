import test from 'ava'
import CustomQueue from 'queue/custom/main'
import add from 'queue/custom/add'

const testMessage1 = 'Test message 1'
const testMessage2 = 'Test message 2'

test.before(t => {
  Object.assign(CustomQueue.prototype, {
    add
  })
})

test('1 item', async t => {
  const output = []
  let resolveProcessed
  const processed = new Promise(resolve => {
    resolveProcessed = resolve
  })
  function processor (data) {
    output.push(data)
    resolveProcessed()
  }
  const queue = new CustomQueue(processor)
  queue.add(testMessage1)
  await processed
  const output1 = output.shift()
  t.is(output1, testMessage1)
})

test('2 items', async t => {
  const output = []
  let resolveProcessed
  const processed = new Promise(resolve => {
    resolveProcessed = resolve
  })
  function processor (data) {
    output.push(data)
    if (output.length === 2) resolveProcessed()
  }
  const queue = new CustomQueue(processor)
  queue.add(testMessage1)
  queue.add(testMessage2)
  await processed
  const output1 = output.shift()
  t.is(output1, testMessage1)
  const output2 = output.shift()
  t.is(output2, testMessage2)
})
