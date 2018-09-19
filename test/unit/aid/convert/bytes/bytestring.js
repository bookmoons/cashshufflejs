import test from 'ava'
import { byteToByteString } from 'aid/reduce'
import bytesToByteString from 'aid/convert/bytes/bytestring'

test('success', t => {
  const bytesArray = []
  for (let i = 0; i <= 255; i++) bytesArray[i] = i
  const bytes = Uint8Array.from(bytesArray)
  const expectedByteString = bytesArray.reduce(byteToByteString, '')
  const byteString = bytesToByteString(bytes)
  t.is(byteString, expectedByteString)
})
