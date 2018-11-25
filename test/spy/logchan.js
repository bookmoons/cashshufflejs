import sinon from 'sinon'
import DummyLogchan from 'dummy/logchan'

class SpyLogchan extends DummyLogchan {}

const stringKeys = Object.getOwnPropertyNames(DummyLogchan.prototype)
const symbolKeys = Object.getOwnPropertySymbols(DummyLogchan.prototype)
const keys = [ ...stringKeys, ...symbolKeys ]
for (const key of keys) {
  const member = DummyLogchan.prototype[key]
  if (typeof member !== 'function') continue
  const spy = sinon.spy(member)
  SpyLogchan.prototype[key] = spy
}

export default SpyLogchan
