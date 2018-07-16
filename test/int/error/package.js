import test from 'ava'
import CashShuffleError from 'error/CashShuffle'
import MissingValueError from 'error/MissingValue'
import NotImplementedError from 'error/NotImplemented'
import * as error from 'error'

test('CashShuffle', t => {
  t.is(error.CashShuffleError, CashShuffleError)
})

test('MissingValue', t => {
  t.is(error.MissingValueError, MissingValueError)
})

test('NotImplemented', t => {
  t.is(error.NotImplementedError, NotImplementedError)
})
