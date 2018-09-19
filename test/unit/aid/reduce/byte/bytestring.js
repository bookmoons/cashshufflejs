import test from 'ava'
import byteToByteString from 'aid/reduce/byte/bytestring'

test('empty', t => {
  const bytesArray = []
  const byteString = bytesArray.reduce(byteToByteString, '')
  t.is(byteString, '')
})

test('1 byte', t => {
  const bytesArray = [ 65 ]
  const byteString = bytesArray.reduce(byteToByteString, '')
  t.is(byteString, 'A')
})

test('3 bytes', t => {
  const bytesArray = [ 65, 66, 67 ]
  const byteString = bytesArray.reduce(byteToByteString, '')
  t.is(byteString, 'ABC')
})
