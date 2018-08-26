import path from 'path'
import protobuf from 'protobufjs'

async function loadProtocol () {
  const definitionPath = path.join(
    __dirname,
    '..', '..',
    'src',
    'protocol',
    'cashshuffle.proto'
  )
  const protocol = await protobuf.load(definitionPath)
  return protocol
}

export default loadProtocol
