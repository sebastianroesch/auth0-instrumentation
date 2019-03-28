"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AWSSettings_1 = require("./AWSSettings");
var LoggingSettings_1 = require("./LoggingSettings");
var MetricsSettings_1 = require("./MetricsSettings");
var TracingSettings_1 = require("./TracingSettings");
var Configuration = /** @class */ (function () {
    function Configuration(env, pkg) {
        this.aws = new AWSSettings_1.AWSSettings(env);
        this.logging = new LoggingSettings_1.LoggingSettings(env);
        this.metrics = new MetricsSettings_1.MetricsSettings(env, pkg);
        this.tracing = new TracingSettings_1.TracingSettings(env);
    }
    return Configuration;
}());
exports.default = Configuration;
