"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MetricsValues = /** @class */ (function () {
    function MetricsValues(env) {
        this.statsdHost = env.STATSD_HOST;
        this.metricsPrefix = env.METRICS_PREFIX;
        this.apiKey = env.METRICS_API_KEY;
        this.metricsHost = env.METRICS_HOST;
        this.flushInterval = env.METRICS_FLUSH_INTERVAL;
        this.packageAsServiceName = env.METRICS_PKG_AS_SERVICE_NAME;
    }
    return MetricsValues;
}());
exports.MetricsValues = MetricsValues;
