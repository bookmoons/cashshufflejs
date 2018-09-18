import test from 'ava'
import bytesToArray from 'aid/convert/bytes/array'

test('success', t => {
  const bytes = new Uint8Array(256)
  for (let i = 0; i <= 255; i++) bytes[i] = i
  const bytesArray = bytesToArray(bytes)
  t.true(Array.isArray(bytesArray))
  for (let i = 0; i <= 255; i++) t.is(bytesArray[i], i)
})
