/** @module cashshuffle/session */

import Session from './main'
import affix from './affix'
import announce from './phase/announce'
import decryptOutputList from './adjunct/decrypt'
import encryptLayered from './adjunct/layered'
import gatherAnnounce from './gather/announce'
import gatherOutputList from './gather/outputlist'
import messageAnnounce from './message/announce'
import messageFinalOutput from './message/finaloutput'
import messageOutputList from './message/outputlist'
import packageSignedPacket from './package'
import shuffle from './phase/shuffle'
import sign from './sign'
import validateAnnounce from './validate/announce'
import validateOutputList from './validate/outputlist'

Object.assign(Session.prototype, {
  affix,
  announce,
  decryptOutputList,
  encryptLayered,
  gatherAnnounce,
  gatherOutputList,
  messageAnnounce,
  messageFinalOutput,
  messageOutputList,
  packageSignedPacket,
  shuffle,
  sign,
  validateAnnounce,
  validateOutputList
})

export default Session
