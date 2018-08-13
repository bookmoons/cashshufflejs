import path from 'path'
import protobuf from 'protobufjs'
import privs from './privs'

/**
 * Initialize Inchan.
 *
 * Loads protocol definition from internal protobuf file.
 *
 * @memberof module:cashshuffle/inchan/inchanbin.Inchan
 */
async function init () {
  const priv = privs.get(this)
  const definitionPath = path.join(
    __dirname,
    '..',
    '..',
    'protocol',
    'cashshuffle.proto'
  )
  const protocol = await protobuf.load(definitionPath)
  priv.protocol = protocol
  const Signed = protocol.Signed
  priv.Signed = Signed
}

export default init
