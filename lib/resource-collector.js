/**
 * @typedef {Object} MemoryUsage
 * @property {number} heapTotal Total heap memory allocated
 * @property {number} heapUsed Total heap used
 */

/**
 * @typedef {Object} ProcessStats
 * @property {number} memory Total process memory used
 * @property {number} cpu Total process CPU used
 */

class ResourceCollector {
  constructor(processWatcher = process, pidUsage = require('pidusage')) {
    this.process = processWatcher;
    this.pidUsage = pidUsage;
  }

  /**
   * Returns current process memory usage
   * @returns {MemoryUsage}
   */
  getMemoryUsage() {
    return this.process.memoryUsage();
  }

  /**
   * Returns the actual Node process stats
   * @returns {Promise<ProcessStats>}
   */
  getProcessStats() {
    return new Promise((resolve, reject) => {
      this.pidUsage.stat(process.pid, function(err, stat) {
        if (err) {
          return reject(err);
        }

        return resolve(stat);
      });
    });
  }
}

module.exports = ResourceCollector;
