import { EnvironmentVariables } from "src/configuration/EnvironmentVariables";
import { TracingSettings } from "src/configuration/TracingSettings";
import { TracingAgents } from "src/configuration/TracingAgents";

describe("TracingValues", () => {
  describe("constructor", () => {
    let actual: TracingSettings;
    let environment: EnvironmentVariables;

    it("should map variables correctly", () => {
      environment = new EnvironmentVariables();
      environment.TRACE_AGENT_CLIENT = TracingAgents.JAEGER;
      environment.TRACE_AGENT_HOST = "test-host";
      environment.TRACE_AGENT_PORT = 250;
      environment.TRACE_AGENT_API_KEY = "test-key";
      environment.TRACE_AGENT_USE_TLS = true;
      environment.TRACE_REPORTING_INTERVAL_MILLIS = 350;

      actual = new TracingSettings(environment);
      expect(actual.traceAgent).toEqual(environment.TRACE_AGENT_CLIENT);
      expect(actual.agentHost).toEqual(environment.TRACE_AGENT_HOST);
      expect(actual.agentPort).toEqual(environment.TRACE_AGENT_PORT);
      expect(actual.apiKey).toEqual(environment.TRACE_AGENT_API_KEY);
      expect(actual.useTLS).toEqual(environment.TRACE_AGENT_USE_TLS);
      expect(actual.reportInterval).toEqual(environment.TRACE_REPORTING_INTERVAL_MILLIS);
    });
  });
});
