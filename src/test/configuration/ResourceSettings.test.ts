import { ResourceSettings } from "src/configuration/ResourceSettings";
import { EnvironmentVariables } from "src/configuration/EnvironmentVariables";

describe("ResourceValues", () => {
  let actual: ResourceSettings;
  let environment: EnvironmentVariables;

  describe("constructor", () => {
    it("should map variables correctly", () => {
      environment = new EnvironmentVariables();
      environment.COLLECT_RESOURCE_USAGE = true;
      environment.COLLECT_RESOURCE_USAGE_INTERVAL = 200;
      environment.HUNT_LONG_GC = false;
      environment.HUNT_MEMORY_LEAKS = true;
      environment.HEAPDUMP_DIR = "test-dir";
      environment.PROFILE_GC = false;
      actual = new ResourceSettings(environment);
      expect(actual.collectUsage).toEqual(environment.COLLECT_RESOURCE_USAGE);
      expect(actual.reportInterval).toEqual(environment.COLLECT_RESOURCE_USAGE_INTERVAL);
      expect(actual.huntLongGC).toEqual(environment.HUNT_LONG_GC);
      expect(actual.huntMemoryLeaks).toEqual(environment.HUNT_MEMORY_LEAKS);
      expect(actual.heapDumpDirectory).toEqual(environment.HEAPDUMP_DIR);
      expect(actual.profileGC).toEqual(environment.PROFILE_GC);
    });
  });
});
