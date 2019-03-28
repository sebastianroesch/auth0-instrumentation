"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceValues = /** @class */ (function () {
    function ResourceValues(env) {
        this.collectUsage = env.COLLECT_RESOURCE_USAGE;
        this.reportInterval = env.COLLECT_RESOURCE_USAGE_INTERVAL;
        this.huntLongGC = env.HUNT_LONG_GC;
        this.huntMemoryLeaks = env.HUNT_MEMORY_LEAKS;
        this.heapDumpDirectory = env.HEAPDUMP_DIR;
        this.profileGC = env.PROFILE_GC;
    }
    return ResourceValues;
}());
exports.ResourceValues = ResourceValues;
