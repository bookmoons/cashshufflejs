import test from 'ava'
import CashShuffleError from 'error/CashShuffle'
import BusyError from 'error/Busy'
import EmptyError from 'error/Empty'
import ExhaustionError from 'error/Exhaustion'
import FormatError from 'error/Format'
import InadequateError from 'error/Inadequate'
import MissingFeatureError from 'error/MissingFeature'
import MissingValueError from 'error/MissingValue'
import NotImplementedError from 'error/NotImplemented'
import TimeoutError from 'error/Timeout'
import UnavailableError from 'error/Unavailable'
import ValueError from 'error/Value'
import * as error from 'error'

test('CashShuffle', t => {
  t.is(error.CashShuffleError, CashShuffleError)
})

test('Busy', t => {
  t.is(error.BusyError, BusyError)
})

test('Empty', t => {
  t.is(error.EmptyError, EmptyError)
})

test('Exhaustion', t => {
  t.is(error.ExhaustionError, ExhaustionError)
})

test('Format', t => {
  t.is(error.FormatError, FormatError)
})

test('Inadequate', t => {
  t.is(error.InadequateError, InadequateError)
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

test('Timeout', t => {
  t.is(error.TimeoutError, TimeoutError)
})

test('Unavailable', t => {
  t.is(error.UnavailableError, UnavailableError)
})

test('Value', t => {
  t.is(error.ValueError, ValueError)
})
