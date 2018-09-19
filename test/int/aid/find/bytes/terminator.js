import test from 'ava'
import { terminatorBytes } from 'protocol'
import { concatenateBytes } from 'aid/bytes'
import findBytesTerminator from 'aid/find/bytes/terminator'

test('empty', t => {
  const bytes = new Uint8Array(0)
  const index = bytes.findIndex(findBytesTerminator)
  t.is(index, -1)
})

test('short', t => {
  const bytes = Uint8Array.from([ 0x01 ])
  const index = bytes.findIndex(findBytesTerminator)
  t.is(index, -1)
})

test('no terminator', t => {
  const bytes = Uint8Array.from([ 0x01, 0x02, 0x03, 0x04, 0x05 ])
  const index = bytes.findIndex(findBytesTerminator)
  t.is(index, -1)
})

test('front', t => {
  const bytes = concatenateBytes([
    terminatorBytes,
    Uint8Array.from([ 0xaa, 0xbb, 0xcc ])
  ])
  const index = bytes.findIndex(findBytesTerminator)
  t.is(index, 0)
})

test('middle', t => {
  const bytes = concatenateBytes([
    Uint8Array.from([ 0xaa, 0xbb, 0xcc ]),
    terminatorBytes,
    Uint8Array.from([ 0xdd, 0xee, 0xff ])
  ])
  const index = bytes.findIndex(findBytesTerminator)
  t.is(index, 3)
})

test('back', t => {
  const bytes = concatenateBytes([
    Uint8Array.from([ 0xdd, 0xee, 0xff, 0xaa, 0xbb, 0xcc ]),
    terminatorBytes
  ])
  const index = bytes.findIndex(findBytesTerminator)
  t.is(index, 6)
})
