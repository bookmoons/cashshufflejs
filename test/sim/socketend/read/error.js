function handleReadError (error) {
  this.emit('error', error)
}

export default handleReadError
