/** @module cashshuffle/session */

import Session from './main'
import affix from './util/affix'
import announce from './phase/announce'
import broadcastOutput from './phase/output'
import checkEquivocation from './phase/equiv'
import decryptOutputList from './adjunct/decrypt'
import encryptLayered from './adjunct/layered'
import gatherAnnounce from './gather/announce'
import gatherDigest from './gather/digest'
import gatherFinalOutput from './gather/finalout'
import gatherShuffleOutput from './gather/shuffleout'
import gatherSignature from './gather/signature'
import hashInput from './adjunct/hashin'
import messageAnnounce from './message/announce'
import messageDigest from './message/digest'
import messageFinalOutput from './message/finalout'
import messageShuffleOutput from './message/shuffleout'
import messageSignature from './message/signature'
import orderShufflers from './adjunct/order'
import packageSignedPacket from './util/pack'
import packageSignedPackets from './util/packs'
import run from './run'
import shuffle from './phase/shuffle'
import sign from './util/sign'
import submit from './phase/submit'
import validateAnnounce from './validate/announce'
import validateDigest from './validate/digest'
import validateFinalOutput from './validate/finalout'
import validateShuffleOutput from './validate/shuffleout'
import validateSignature from './validate/signature'

Object.assign(Session.prototype, {
  affix,
  announce,
  broadcastOutput,
  checkEquivocation,
  decryptOutputList,
  encryptLayered,
  gatherAnnounce,
  gatherDigest,
  gatherFinalOutput,
  gatherShuffleOutput,
  gatherSignature,
  hashInput,
  messageAnnounce,
  messageDigest,
  messageFinalOutput,
  messageShuffleOutput,
  messageSignature,
  orderShufflers,
  packageSignedPacket,
  packageSignedPackets,
  run,
  shuffle,
  sign,
  submit,
  validateAnnounce,
  validateDigest,
  validateFinalOutput,
  validateShuffleOutput,
  validateSignature
})

Object.freeze(Session)

export default Session
