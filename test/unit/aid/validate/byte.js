import test from 'ava'
import { ValueError } from 'error'
import validateByte from 'aid/validate/byte'

function verifyNotNumber (t, error) {
  t.true(error instanceof ValueError)
  t.true(error.message.startsWith('invalid byte'))
  const cause = error.cause()
  t.true(cause instanceof TypeError)
  t.is(cause.message, 'not number')
}

function verifyNotInteger (t, error) {
  t.true(error instanceof ValueError)
  t.true(error.message.startsWith('invalid byte'))
  const cause = error.cause()
  t.true(cause instanceof TypeError)
  t.is(cause.message, 'not integer')
}

function verifyOutsideRange (t, error) {
  t.true(error instanceof ValueError)
  t.true(error.message.startsWith('invalid byte'))
  const cause = error.cause()
  t.true(cause instanceof RangeError)
  t.is(cause.message, 'not in 0-255')
}

test('missing', t => {
  const error = t.throws(() => {
    validateByte()
  })
  verifyNotNumber(t, error)
})

test('undefined', t => {
  const undef = void 0
  const error = t.throws(() => {
    validateByte(undef)
  })
  verifyNotNumber(t, error)
})

test('string', t => {
  const error = t.throws(() => {
    validateByte('string')
  })
  verifyNotNumber(t, error)
})

test('object', t => {
  const error = t.throws(() => {
    validateByte({})
  })
  verifyNotNumber(t, error)
})

test('array', t => {
  const error = t.throws(() => {
    validateByte([])
  })
  verifyNotNumber(t, error)
})

test('function', t => {
  const error = t.throws(() => {
    validateByte(function () {})
  })
  verifyNotNumber(t, error)
})

test('symbol', t => {
  const error = t.throws(() => {
    validateByte(Symbol('symbol'))
  })
  verifyNotNumber(t, error)
})

test('nan', t => {
  const error = t.throws(() => {
    validateByte(Number.NaN)
  })
  verifyNotNumber(t, error)
})

test('float positive', t => {
  const error = t.throws(() => {
    validateByte(6.7)
  })
  verifyNotInteger(t, error)
})

test('float negative', t => {
  const error = t.throws(() => {
    validateByte(-4.5)
  })
  verifyNotInteger(t, error)
})

test('infinity positive', t => {
  const error = t.throws(() => {
    validateByte(Number.POSITIVE_INFINITY)
  })
  verifyNotInteger(t, error)
})

test('infinity negative', t => {
  const error = t.throws(() => {
    validateByte(Number.NEGATIVE_INFINITY)
  })
  verifyNotInteger(t, error)
})

test('large', t => {
  const error = t.throws(() => {
    validateByte(876)
  })
  verifyOutsideRange(t, error)
})

test('small', t => {
  const error = t.throws(() => {
    validateByte(-5)
  })
  verifyOutsideRange(t, error)
})

test('valid', t => {
  for (let byte = 0; byte <= 255; byte++) {
    t.notThrows(() => {
      validateByte(byte)
    })
  }
})
