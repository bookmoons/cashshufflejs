import test from 'ava'
import CashShuffleError from 'error/CashShuffle'
import NotImplementedError from 'error/NotImplemented'
import * as error from 'error'

test('CashShuffle', t => {
  t.is(error.CashShuffleError, CashShuffleError)
})

test('NotImplemented', t => {
  t.is(error.NotImplementedError, NotImplementedError)
})
