import test from 'ava'
import concatenateBytes from 'aid/bytes/concat'

test('none', t => {
  const bytesList = []
  const bytes = concatenateBytes(bytesList)
  t.deepEqual(bytes, new Uint8Array(0))
})

test('single empty', t => {
  const bytesList = [ new Uint8Array(0) ]
  const bytes = concatenateBytes(bytesList)
  t.deepEqual(bytes, new Uint8Array(0))
})

test('all empty', t => {
  const bytesList = [
    new Uint8Array(0),
    new Uint8Array(0),
    new Uint8Array(0)
  ]
  const bytes = concatenateBytes(bytesList)
  t.deepEqual(bytes, new Uint8Array(0))
})

test('some empty', t => {
  const bytesList = [
    new Uint8Array(0),
    Uint8Array.from([ 0x0a, 0x0b, 0x0c ]),
    new Uint8Array(0)
  ]
  const expectedBytes = Uint8Array.from([ 0x0a, 0x0b, 0x0c ])
  const bytes = concatenateBytes(bytesList)
  t.deepEqual(bytes, expectedBytes)
})

test('single', t => {
  const bytesList = [ Uint8Array.from([ 0x05, 0x06, 0x07 ]) ]
  const expectedBytes = Uint8Array.from([ 0x05, 0x06, 0x07 ])
  const bytes = concatenateBytes(bytesList)
  t.deepEqual(bytes, expectedBytes)
})

test('multiple', t => {
  const bytesList = [
    Uint8Array.from([ 0x04, 0x03, 0x02 ]),
    Uint8Array.from([ 0xff, 0xdd, 0xee ]),
    Uint8Array.from([ 0x1c, 0x2c, 0x3c ])
  ]
  const expectedBytes = Uint8Array.from([
    0x04, 0x03, 0x02, 0xff, 0xdd, 0xee, 0x1c, 0x2c, 0x3c
  ])
  const bytes = concatenateBytes(bytesList)
  t.deepEqual(bytes, expectedBytes)
})
