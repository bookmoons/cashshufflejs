import test from 'ava'
import { Duplex } from 'stream'
import dummyFunction from 'dummy/function'
import SocketEndSimulator from 'sim/socketend/main'

test('subclass', t => {
  const socketEnd = new SocketEndSimulator({
    write: dummyFunction
  })
  t.true(socketEnd instanceof Duplex)
})
