"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnvironmentVariables_1 = require("src/configuration/EnvironmentVariables");
var TracingSettings_1 = require("src/configuration/TracingSettings");
var TracingAgents_1 = require("src/configuration/TracingAgents");
describe("TracingValues", function () {
    describe("constructor", function () {
        var actual;
        var environment;
        it("should map variables correctly", function () {
            environment = new EnvironmentVariables_1.EnvironmentVariables();
            environment.TRACE_AGENT_CLIENT = TracingAgents_1.TracingAgents.JAEGER;
            environment.TRACE_AGENT_HOST = "test-host";
            environment.TRACE_AGENT_PORT = 250;
            environment.TRACE_AGENT_API_KEY = "test-key";
            environment.TRACE_AGENT_USE_TLS = true;
            environment.TRACE_REPORTING_INTERVAL_MILLIS = 350;
            actual = new TracingSettings_1.TracingSettings(environment);
            expect(actual.traceAgent).toEqual(environment.TRACE_AGENT_CLIENT);
            expect(actual.agentHost).toEqual(environment.TRACE_AGENT_HOST);
            expect(actual.agentPort).toEqual(environment.TRACE_AGENT_PORT);
            expect(actual.apiKey).toEqual(environment.TRACE_AGENT_API_KEY);
            expect(actual.useTLS).toEqual(environment.TRACE_AGENT_USE_TLS);
            expect(actual.reportInterval).toEqual(environment.TRACE_REPORTING_INTERVAL_MILLIS);
        });
    });
});
