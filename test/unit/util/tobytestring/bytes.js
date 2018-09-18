import test from 'ava'
import bytesToByteString from 'util/tobytestring/bytes'

test('success', t => {
  const bytesArray = []
  for (let i = 0; i <= 255; i++) bytesArray[i] = i
  const bytes = Uint8Array.from(bytesArray)
  const expectedByteString = bytesArray.reduce(
    function reduceBytesArray (byteString, byte) {
      const character = String.fromCodePoint(byte)
      byteString += character
      return byteString
    },
    ''
  )
  const byteString = bytesToByteString(bytes)
  t.is(byteString, expectedByteString)
})
