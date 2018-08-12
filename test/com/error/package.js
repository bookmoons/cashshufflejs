import test from 'ava'
import CashShuffleError from 'error/CashShuffle'
import BusyError from 'error/Busy'
import FeatureMissingError from 'error/FeatureMissing'
import MissingValueError from 'error/MissingValue'
import NotImplementedError from 'error/NotImplemented'
import * as error from 'error'

test('CashShuffle', t => {
  t.is(error.CashShuffleError, CashShuffleError)
})

test('Busy', t => {
  t.is(error.BusyError, BusyError)
})

test('FeatureMissing', t => {
  t.is(error.FeatureMissingError, FeatureMissingError)
})

test('MissingValue', t => {
  t.is(error.MissingValueError, MissingValueError)
})

test('NotImplemented', t => {
  t.is(error.NotImplementedError, NotImplementedError)
})
