import test from 'ava'
import dummyFunction from 'dummy/function'
import CustomQueue from 'queue/custom/main'
import add from 'queue/custom/add'
import empty from 'queue/custom/empty'

const testMessage1 = 'Test message 1'
const testMessage2 = 'Test message 2'

test.before(t => {
  Object.assign(CustomQueue.prototype, {
    add
  })
  Object.defineProperty(CustomQueue.prototype, 'empty', {
    get: empty
  })
})

test('1 item', async t => {
  const output = []
  function processor (data) { output.push(data) }
  const queue = new CustomQueue(processor)
  queue.add(testMessage1)
  await queue.empty
  const output1 = output.shift()
  t.is(output1, testMessage1)
})

test('2 items', async t => {
  const output = []
  function processor (data) { output.push(data) }
  const queue = new CustomQueue(processor)
  queue.add(testMessage1)
  queue.add(testMessage2)
  await queue.empty
  const output1 = output.shift()
  t.is(output1, testMessage1)
  const output2 = output.shift()
  t.is(output2, testMessage2)
})

test('no items', async t => {
  const queue = new CustomQueue(dummyFunction)
  await t.notThrowsAsync(async () => {
    await queue.empty
  })
})
