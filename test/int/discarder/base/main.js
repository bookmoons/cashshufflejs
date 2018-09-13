import test from 'ava'
import Receiver from 'receiver/base'
import Discarder from 'discarder/base'

test('subclass', t => {
  const discarder = new Discarder()
  t.true(discarder instanceof Receiver)
})
