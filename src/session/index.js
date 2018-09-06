/** @module cashshuffle/session */

import Session from './main'
import affix from './affix'
import announce from './phase/announce'
import encryptLayered from './adjunct/layered'
import gatherAnnounce from './gather/announce'
import gatherOutputList from './gather/outputlist'
import messageAnnounce from './message/announce'
import messageOutputList from './message/outputlist'
import packageSignedPacket from './package'
import shuffle from './phase/shuffle'
import sign from './sign'
import validateAnnounce from './validate/announce'
import validateOutputList from './validate/outputlist'

Object.assign(Session.prototype, {
  affix,
  announce,
  encryptLayered,
  gatherAnnounce,
  gatherOutputList,
  messageAnnounce,
  messageOutputList,
  packageSignedPacket,
  shuffle,
  sign,
  validateAnnounce,
  validateOutputList
})

export default Session
