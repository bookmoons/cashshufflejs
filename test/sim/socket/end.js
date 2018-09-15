import SocketEndSimulator from 'sim/socketend'

/**
 * Make a socket end.
 *
 * @param {Inbox} input - Input channel.
 * @param {Inbox} output - Output channel.
 */
function makeSocketEnd (input, output) {
  async function handleSocketEndRead (size, deliver) {
    let more = true
    while (more) {
      const chunk = await output.watch()
      more = deliver(chunk)
    }
  }
  async function handleSocketEndWrite (chunk) {
    input.add(chunk)
  }
  const socketEnd = new SocketEndSimulator({
    read: handleSocketEndRead,
    write: handleSocketEndWrite
  })
  return socketEnd
}

export default makeSocketEnd
