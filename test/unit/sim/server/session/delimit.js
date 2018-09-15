import test from 'ava'
import { terminatorBuffer } from 'protocol'
import delimit from 'sim/server/session/delimit'

const emptyMessage = Buffer.alloc(0)
const testMessage = Buffer.from([ 0x01, 0x02, 0x03 ])
const emptyFrame = Buffer.concat([ emptyMessage, terminatorBuffer ])
const expectedFrame = Buffer.concat([ testMessage, terminatorBuffer ])

test('empty message', t => {
  const frame = delimit(emptyMessage)
  t.deepEqual(frame, emptyFrame)
})

test('nonempty message', t => {
  const frame = delimit(testMessage)
  t.deepEqual(frame, expectedFrame)
})
