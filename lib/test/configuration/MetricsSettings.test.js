"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MetricsSettings_1 = require("src/configuration/MetricsSettings");
var EnvironmentVariables_1 = require("src/configuration/EnvironmentVariables");
describe("MetricsValues", function () {
    describe("constructor", function () {
        var actual;
        var environment;
        it("should map variables correctly", function () {
            environment = new EnvironmentVariables_1.EnvironmentVariables();
            environment.STATSD_HOST = "test-statds";
            environment.METRICS_PREFIX = "test-prefix";
            environment.METRICS_API_KEY = "test-apikey";
            environment.METRICS_HOST = "test-host";
            environment.METRICS_FLUSH_INTERVAL = 200;
            environment.METRICS_PKG_AS_SERVICE_NAME = "my-pkg";
            actual = new MetricsSettings_1.MetricsSettings(environment, { name: "test-service" });
            expect(actual.statsdHost).toEqual(environment.STATSD_HOST);
            expect(actual.metricsPrefix).toEqual(environment.METRICS_PREFIX);
            expect(actual.metricsHost).toEqual(environment.METRICS_HOST);
            expect(actual.flushInterval).toEqual(environment.METRICS_FLUSH_INTERVAL);
            expect(actual.apiKey).toEqual(environment.METRICS_API_KEY);
            expect(actual.packageAsServiceName).toEqual(environment.METRICS_PKG_AS_SERVICE_NAME);
        });
    });
});
