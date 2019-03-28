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
var MetricsProvider_1 = require("./MetricsProvider");
var url = require("url");
var node_statsd_1 = require("node-statsd");
var uuid = require("uuid");
var StatsDProvider = /** @class */ (function (_super) {
    __extends(StatsDProvider, _super);
    function StatsDProvider(configuration) {
        var _this = _super.call(this, configuration.resourceSettings) || this;
        if (!configuration.statsdHost) {
            throw new Error("Unable to initialize StatsD. Missing parameter StatsD host.");
        }
        var parsedURL = url.parse(configuration.statsdHost);
        _this.isActive = true;
        _this.provider = new node_statsd_1.StatsD({
            host: parsedURL.hostname,
            port: Number(parsedURL.port),
            prefix: configuration.metricsPrefix,
            cacheDns: true
        });
        return _this;
    }
    StatsDProvider.prototype.gauge = function (name, value, tags, callback) {
        this.provider.gauge(name, value, this.getTags(tags), callback);
    };
    StatsDProvider.prototype.increment = function (name, valueOrTags, tags, callback) {
        var value;
        if (Array.isArray(valueOrTags)) {
            tags = valueOrTags;
            value = 1;
        }
        this.provider.increment(name, value, this.getTags(tags), callback);
    };
    StatsDProvider.prototype.incrementOne = function (name, tags, callback) {
        this.increment(name, 1, tags, callback);
    };
    StatsDProvider.prototype.histogram = function (name, value, tags, callback) {
        this.provider.histogram(name, value, this.getTags(tags), callback);
    };
    StatsDProvider.prototype.observeBucketed = function (name, value, buckets, tags, callback) {
        var allTags = this.getTags(tags);
        allTags.push("le:Inf");
        buckets.forEach(function (bucket) {
            if (value <= bucket) {
                allTags.push("le:" + bucket);
            }
        });
        this.incrementOne(name, this.getTags(tags), callback);
    };
    StatsDProvider.prototype.flush = function () {
        // StatsD doesn't need to flush metrics
        return;
    };
    StatsDProvider.prototype.startResourceCollection = function (tags) {
        throw new Error("Method not implemented.");
    };
    StatsDProvider.prototype.time = function (name, tags) {
        var id = uuid.v4();
        this.increment(name + ".started", 1, tags);
        this.trackIds[id] = { date: Date.now(), metricName: name };
        return id;
    };
    StatsDProvider.prototype.endTime = function (id, tags) {
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
    return StatsDProvider;
}(MetricsProvider_1.MetricsProvider));
exports.StatsDProvider = StatsDProvider;
