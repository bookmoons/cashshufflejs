import test from 'ava'
import loadProtocol from 'helper/loadprot'
import transferEncodePackets from 'aid/code/transfer/packets/encode'
let protocol

test.before(async t => {
  protocol = await loadProtocol()
})

test('bytes', t => {
  const packets = protocol.Packets.create({})
  const packetsEncoded = transferEncodePackets(protocol, packets)
  t.true(packetsEncoded instanceof Uint8Array)
})

test('empty', t => {
  const packets = protocol.Packets.create({})
  const packetsEncoded = transferEncodePackets(protocol, packets)
  t.deepEqual(packetsEncoded, new Uint8Array(0))
})

test('number', t => {
  const packetsObject = {
    packet: [
      {
        packet: { number: 8 }
      }
    ]
  }
  const expectedBytes = Uint8Array.from([ 0x0a, 0x04, 0x0a, 0x02, 0x10, 0x08 ])
  const packets = protocol.Packets.create(packetsObject)
  const packetsEncoded = transferEncodePackets(protocol, packets)
  t.deepEqual(packetsEncoded, expectedBytes)
})
