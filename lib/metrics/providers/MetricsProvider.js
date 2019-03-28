"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stubs_1 = require("../../Stubs");
var blocked = require("blocked");
var MetricsProvider = /** @class */ (function () {
    function MetricsProvider(configuration) {
        this.callback = Stubs_1.noop;
        this.isActive = true;
        this.defaultTags = [];
        this.configuration = configuration;
        this.collectResourceUsage = configuration.resourceSettings.collectUsage;
        this.reportInterval = configuration.resourceSettings.reportInterval;
    }
    MetricsProvider.prototype.setDefaultTags = function (tags) {
        this.defaultTags = this.processTags(tags);
    };
    MetricsProvider.prototype.startResourceCollection = function (tags) {
        var _this = this;
        if (!this.collectResourceUsage) {
            return;
        }
        tags = tags || {};
        setInterval(function () {
            var memoryUsage = process.memoryUsage();
            var cpuUsage = process.cpuUsage();
            _this.gauge("resources.memory.heapTotal", memoryUsage.heapTotal, tags); // refer to V8's memory usage
            _this.gauge("resources.memory.heapUsed", memoryUsage.heapUsed, tags); // refer to V8's memory usage
            _this.gauge("resources.memory.rss", memoryUsage.rss); // Resident Set Size, is the amount of space occupied in the main memory device
            _this.gauge("resources.memory.external", memoryUsage.external); // refers to the memory usage of C++ objects bound to JavaScript objects managed by V8
            _this.gauge("resources.cpu.user", cpuUsage.user, tags);
            _this.gauge("resources.cpu.system", cpuUsage.system, tags);
        }, this.reportInterval);
        // Collect Event Loop Blocked - Emit event to notify about event loop blocked
        blocked(function (ms) {
            _this.histogram("event_loop.blocked", ms, tags);
        });
    };
    MetricsProvider.prototype.getTags = function (tags) {
        return this.defaultTags.concat(this.processTags(tags));
    };
    MetricsProvider.prototype.processTags = function (tags) {
        if (Array.isArray(tags)) {
            return tags;
        }
        else if (typeof tags === "object") {
            var processedTags_1 = [];
            Object.keys(tags).forEach(function (key) {
                processedTags_1.push(key + ":" + tags[key]);
            });
            tags = processedTags_1;
        }
        return tags || [];
    };
    return MetricsProvider;
}());
exports.MetricsProvider = MetricsProvider;
