"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceSettings = /** @class */ (function () {
    function ResourceSettings(env) {
        this.collectUsage = env.COLLECT_RESOURCE_USAGE;
        this.reportInterval = env.COLLECT_RESOURCE_USAGE_INTERVAL || 5000;
        this.huntLongGC = env.HUNT_LONG_GC;
        this.huntMemoryLeaks = env.HUNT_MEMORY_LEAKS;
        this.heapDumpDirectory = env.HEAPDUMP_DIR;
        this.profileGC = env.PROFILE_GC;
    }
    return ResourceSettings;
}());
exports.ResourceSettings = ResourceSettings;
