"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var ResourceSettings_1 = require("./ResourceSettings");
var MetricsSettings = /** @class */ (function () {
    function MetricsSettings(env, pkg) {
        this.statsdHost = env.STATSD_HOST;
        this.metricsPrefix = env.METRICS_PREFIX || pkg.name + ".";
        this.apiKey = env.METRICS_API_KEY;
        this.metricsHost = env.METRICS_HOST || os.hostname();
        this.flushInterval = env.METRICS_FLUSH_INTERVAL || 15;
        this.packageAsServiceName = env.METRICS_PKG_AS_SERVICE_NAME;
        this.resourceSettings = new ResourceSettings_1.ResourceSettings(env);
    }
    return MetricsSettings;
}());
exports.MetricsSettings = MetricsSettings;
