import test from 'ava'
import loadProtocol from 'helper/loadprot'
import signEncodePacket from 'aid/code/sign/packet/encode'
let protocol

test.before(async t => {
  protocol = await loadProtocol()
})

test('bytes', t => {
  const packet = protocol.Packet.create({})
  const bytes = signEncodePacket(protocol, packet)
  t.true(bytes instanceof Uint8Array)
})

test('empty', t => {
  const packet = protocol.Packet.create({})
  const bytes = signEncodePacket(protocol, packet)
  t.deepEqual(bytes, new Uint8Array(0))
})

test('number', t => {
  const packet = protocol.Packet.create({ number: 8 })
  const bytes = signEncodePacket(protocol, packet)
  t.deepEqual(bytes, Uint8Array.from([ 0x10, 0x08 ]))
})
