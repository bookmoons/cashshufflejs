import test from 'ava'
import dummyFunction from 'dummy/function'
import Queue from 'queue/base'
import CustomQueue from 'queue/custom'

test('subclass', t => {
  const queue = new CustomQueue(dummyFunction)
  t.true(queue instanceof Queue)
})
