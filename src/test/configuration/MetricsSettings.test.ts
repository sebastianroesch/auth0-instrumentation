import { MetricsSettings } from "src/configuration/MetricsSettings";
import { EnvironmentVariables } from "src/configuration/EnvironmentVariables";

describe("MetricsValues", () => {
  describe("constructor", () => {
    let actual: MetricsSettings;
    let environment: EnvironmentVariables;

    it("should map variables correctly", () => {
      environment = new EnvironmentVariables();
      environment.STATSD_HOST = "test-statds";
      environment.METRICS_PREFIX = "test-prefix";
      environment.METRICS_API_KEY = "test-apikey";
      environment.METRICS_HOST = "test-host";
      environment.METRICS_FLUSH_INTERVAL = 200;
      environment.METRICS_PKG_AS_SERVICE_NAME = "my-pkg";
      actual = new MetricsSettings(environment, { name: "test-service" });

      expect(actual.statsdHost).toEqual(environment.STATSD_HOST);
      expect(actual.metricsPrefix).toEqual(environment.METRICS_PREFIX);
      expect(actual.metricsHost).toEqual(environment.METRICS_HOST);
      expect(actual.flushInterval).toEqual(environment.METRICS_FLUSH_INTERVAL);
      expect(actual.apiKey).toEqual(environment.METRICS_API_KEY);
      expect(actual.packageAsServiceName).toEqual(environment.METRICS_PKG_AS_SERVICE_NAME);
    });
  });
});
