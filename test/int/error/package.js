import test from 'ava'
import CashShuffleError from 'error/CashShuffle'
import * as error from 'error'

test('CashShuffle', t => {
  t.is(error.CashShuffleError, CashShuffleError)
})
