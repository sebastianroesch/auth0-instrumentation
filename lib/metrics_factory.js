const url = require('url');
const StatsD = require('node-statsd');
const datadog = require('datadog-metrics');

function buildStatsD(pkg, env) {
  var host;
  var port;

  if(env.STATSD_HOST) {
    const parsedURL = url.parse(env.STATSD_HOST);
    host = parsedURL.hostname;
    port = Number(parsedURL.port);
  } else if(env.PLATFORM_STATSD_HOST) {
    // The Auth0 platform uses separate vars for host and port.
    host = env.PLATFORM_STATSD_HOST;
    port = Number(env.PLATFORM_STATSD_PORT);
  }

  return new StatsD({
    host: host,
    port: port,
    prefix: env.METRICS_PREFIX || (pkg.name + '.'),
    cacheDns: true
  });
}

function buildDataDog(pkg, env) {
  return new datadog.BufferedMetricsLogger({
    apiKey: env.METRICS_API_KEY,
    host: env.METRICS_HOST || require('os').hostname(),
    prefix: env.METRICS_PREFIX || (pkg.name + '.'),
    flushIntervalSeconds: env.METRICS_FLUSH_INTERVAL || 15
  });
}

exports.create = (pkg, env) => {
  var client;

  if (env.STATSD_HOST || env.PLATFORM_STATSD_HOST) {
    client = buildStatsD(pkg, env);
    client.socket.on('error', function noop() {});
  } else if (env.METRICS_API_KEY) {
    client = buildDataDog(pkg, env);
  }

  return client;
};

module.exports = exports;

