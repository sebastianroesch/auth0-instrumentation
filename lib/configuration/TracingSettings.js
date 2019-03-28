"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TracingSettings = /** @class */ (function () {
    function TracingSettings(env) {
        this.traceAgent = env.TRACE_AGENT_CLIENT;
        this.agentHost = env.TRACE_AGENT_HOST;
        this.agentPort = env.TRACE_AGENT_PORT;
        this.apiKey = env.TRACE_AGENT_API_KEY;
        this.useTLS = env.TRACE_AGENT_USE_TLS;
        this.reportInterval = env.TRACE_REPORTING_INTERVAL_MILLIS;
    }
    return TracingSettings;
}());
exports.TracingSettings = TracingSettings;
