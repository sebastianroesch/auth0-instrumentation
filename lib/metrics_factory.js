/** @typedef {import('./configuration/index').Metrics} MetricsConfiguration  */

/**
 * @typedef {Object} Metrics
 * @property {function(string, number, Array, function)} gauge
 * @property {function(string, number, Array, function)} increment
 * @property {function(string, number, Array, function)} histogram
 * @property {function()} flush
 */

const metricsAgents = require('./metrics-providers');

/**
 * @param {MetricsConfiguration} configuration - Metrics configuration settings
 * @returns {Metrics}
 * */
exports.create = function(configuration) {
  if (!metricsAgents[configuration.type]) {
    throw new Error('Unable to find Agent for metrics collection');
  }

  return metricsAgents[configuration.type](configuration);
};

module.exports = exports;
