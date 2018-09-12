import privs from './privs'

/**
 * @memberof module:cashshuffle/logchan/file
 */
class FileLogchan {
  /**
   * @param {string} filePath - Path to log file.
   */
  constructor (filePath) {
    const priv = {
      filePath
    }
    privs.set(this, priv)
  }
}

export default FileLogchan
