import { WebStream } from "src/logging/streams/WebStream";
import { LoggingSettings } from "src/configuration/LoggingSettings";
import LogLevel from "src/configuration/LogLevel";

describe("FileStream", () => {
  let actual: WebStream;
  describe("constructor", () => {
    it("should create a file stream", () => {
      const configuration = new LoggingSettings({
        LOG_LEVEL: LogLevel.DEBUG,
        LOG_TO_WEB_URL: "test-file",
        LOG_TO_WEB_LEVEL: LogLevel.DEBUG
      });

      actual = new WebStream(configuration);
      expect(actual.name).toEqual("web-url");
      expect(actual.stream).toBeDefined();
      expect(actual.level).toEqual(configuration.logWebLevel);
    });
  });
});
