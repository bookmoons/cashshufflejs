import test from 'ava'
import Signing from 'signing/base'
import BitcoreSigning from 'signing/bitcore'

test('subclass', t => {
  const signing = new BitcoreSigning()
  t.true(signing instanceof Signing)
})
