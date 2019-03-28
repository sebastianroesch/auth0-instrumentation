"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceSettings_1 = require("src/configuration/ResourceSettings");
var EnvironmentVariables_1 = require("src/configuration/EnvironmentVariables");
describe("ResourceValues", function () {
    var actual;
    var environment;
    describe("constructor", function () {
        it("should map variables correctly", function () {
            environment = new EnvironmentVariables_1.EnvironmentVariables();
            environment.COLLECT_RESOURCE_USAGE = true;
            environment.COLLECT_RESOURCE_USAGE_INTERVAL = 200;
            environment.HUNT_LONG_GC = false;
            environment.HUNT_MEMORY_LEAKS = true;
            environment.HEAPDUMP_DIR = "test-dir";
            environment.PROFILE_GC = false;
            actual = new ResourceSettings_1.ResourceSettings(environment);
            expect(actual.collectUsage).toEqual(environment.COLLECT_RESOURCE_USAGE);
            expect(actual.reportInterval).toEqual(environment.COLLECT_RESOURCE_USAGE_INTERVAL);
            expect(actual.huntLongGC).toEqual(environment.HUNT_LONG_GC);
            expect(actual.huntMemoryLeaks).toEqual(environment.HUNT_MEMORY_LEAKS);
            expect(actual.heapDumpDirectory).toEqual(environment.HEAPDUMP_DIR);
            expect(actual.profileGC).toEqual(environment.PROFILE_GC);
        });
    });
});
