"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var datadog = require("datadog-metrics");
var MetricsProvider_1 = require("./MetricsProvider");
var uuid = require("uuid");
var DatadogProvider = /** @class */ (function (_super) {
    __extends(DatadogProvider, _super);
    function DatadogProvider(configuration) {
        return _super.call(this, configuration) || this;
    }
    DatadogProvider.prototype.init = function () {
        this.provider = new datadog.BufferedMetricsLogger({
            apiKey: this.configuration.apiKey,
            host: this.configuration.metricsHost,
            prefix: this.configuration.metricsPrefix,
            flushIntervalSeconds: this.configuration.flushInterval
        });
    };
    DatadogProvider.prototype.gauge = function (name, value, tags, callback) {
        this.provider.gauge(name, value, this.getTags(tags));
        if (callback) {
            callback();
        }
    };
    DatadogProvider.prototype.increment = function (name, valueOrTags, tags, callback) {
        if (Array.isArray(valueOrTags)) {
            tags = valueOrTags;
            valueOrTags = 1;
        }
        this.provider.increment(name, valueOrTags || 1, this.getTags(tags));
        if (callback) {
            callback();
        }
    };
    DatadogProvider.prototype.incrementOne = function (name, tags, callback) {
        this.increment(name, 1, tags, callback);
    };
    DatadogProvider.prototype.histogram = function (name, value, tags, callback) {
        this.provider.histogram(name, value, this.getTags(tags));
        if (callback) {
            callback();
        }
    };
    DatadogProvider.prototype.observeBucketed = function (name, value, buckets, tags, callback) {
        var allTags = this.getTags(tags);
        allTags.push("le:Inf");
        buckets.forEach(function (bucket) {
            if (value <= bucket) {
                allTags.push("le:" + bucket);
            }
        });
        this.incrementOne(name, this.getTags(allTags), callback);
    };
    DatadogProvider.prototype.flush = function () {
        this.provider.flush();
    };
    DatadogProvider.prototype.startResourceCollection = function (tags) {
        throw new Error("Method not implemented.");
    };
    DatadogProvider.prototype.time = function (name, tags) {
        var id = uuid.v4();
        this.increment(name + ".started", 1, tags);
        this.trackIds[id] = { date: Date.now(), metricName: name };
        return id;
    };
    DatadogProvider.prototype.endTime = function (id, tags) {
        if (!this.trackIds[id]) {
            return;
        }
        var metricName = this.trackIds[id].metricName;
        var time = Date.now() - this.trackIds[id].date;
        delete this.trackIds[id];
        this.increment(metricName + ".ended", 1, tags);
        this.histogram(metricName + ".time", time, tags);
        return time;
    };
    return DatadogProvider;
}(MetricsProvider_1.MetricsProvider));
exports.DatadogProvider = DatadogProvider;
