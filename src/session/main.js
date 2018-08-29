import privs from './privs'
import { defaultAttempts, defaultTimeout } from './default'

/**
 * @typedef {object} SessionParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition.
 * @prop {number} [attempts=<default>] - Maximum gather attempts.
 *     Positive integer.
 * @prop {number} [timeout=<default>] - Network operation timeout
 *     in milliseconds.
 * @prop {ArrayBuffer} sessionId - Session identifier.
 * @prop {number} participantNumber - Participant index in pool in join order.
 *     Provided by server in join response.
 * @prop {Signing} signingKeyPair - Participant signing key pair.
 *     Assumed ready for use.
 * @prop {Iterable<string>} inputs - Input addresses as strings.
 *     Will be deduplicated and ordered lexicographically.
 * @prop {number} amount - Amount to shuffle in satoshis.
 * @prop {Coin} coin - Bitcoin Cash network interface.
 * @prop {Outchan} outchan - Output message channel.
 * @prop {Receiver} receiver - Session message receiver.
 * @prop {Receiver} [discarder=null] - Receiver to discard message to.
 */

/**
 * @memberof module:cashshuffle/session
 */
class Session {
  /**
   * @param {SessionParams} params
   */
  constructor ({
    protocol,
    attempts = defaultAttempts,
    timeout = defaultTimeout,
    sessionId,
    participantNumber,
    signingKeyPair,
    inputs,
    amount,
    coin,
    outchan,
    receiver
  }) {
    const inputsSet = new Set(inputs)
    const inputsArray = [ ...inputsSet ]
    inputsArray.sort()
    const priv = {
      protocol,
      attempts,
      timeout,
      sessionId,
      signingKeyPair,
      inputs: inputsArray,
      amount,
      coin,
      outchan,
      receiver
    }
    privs.set(this, priv)
  }
}

export default Session
