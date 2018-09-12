import Logchan from '../base'
import privs from './privs'

/**
 * @memberof module:cashshuffle/logchan/file
 */
class FileLogchan extends Logchan {
  /**
   * @param {string} filePath - Path to log file.
   */
  constructor (filePath) {
    super()
    const priv = {
      filePath
    }
    privs.set(this, priv)
  }
}

export default FileLogchan
