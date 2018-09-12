import test from 'ava'
import Receiver from 'receiver/base'
import StoreReceiver from 'receiver/store'

test('subclass', t => {
  const receiver = new StoreReceiver()
  t.true(receiver instanceof Receiver)
})
