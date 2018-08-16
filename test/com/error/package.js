import test from 'ava'
import CashShuffleError from 'error/CashShuffle'
import BusyError from 'error/Busy'
import FormatError from 'error/Format'
import MissingFeatureError from 'error/MissingFeature'
import MissingValueError from 'error/MissingValue'
import NotImplementedError from 'error/NotImplemented'
import ValueError from 'error/Value'
import * as error from 'error'

test('CashShuffle', t => {
  t.is(error.CashShuffleError, CashShuffleError)
})

test('Busy', t => {
  t.is(error.BusyError, BusyError)
})

test('Format', t => {
  t.is(error.FormatError, FormatError)
})

test('FeatureMissing', t => {
  t.is(error.MissingFeatureError, MissingFeatureError)
})

test('MissingValue', t => {
  t.is(error.MissingValueError, MissingValueError)
})

test('NotImplemented', t => {
  t.is(error.NotImplementedError, NotImplementedError)
})

test('Value', t => {
  t.is(error.ValueError, ValueError)
})
