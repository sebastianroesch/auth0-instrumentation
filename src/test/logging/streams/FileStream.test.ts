import LogLevel from "src/configuration/LogLevel";
import { LoggingSettings } from "src/configuration/LoggingSettings";
import { FileStream } from "src/logging/streams/FileStream";

describe("FileStream", () => {
  let actual: FileStream;
  describe("constructor", () => {
    it("should create a file stream", () => {
      const configuration = new LoggingSettings({ LOG_LEVEL: LogLevel.DEBUG, LOG_FILE: "test-file" });

      actual = new FileStream(configuration);
      expect(actual.path).toEqual(configuration.logFilename);
      expect(actual.level).toEqual(configuration.logLevel);
      expect(actual.name).toEqual("file-stream");
    });
  });
});
