import { KinesisStream } from "src/logging/streams/KinesisStream";
import LogLevel from "src/configuration/LogLevel";
import { LoggingSettings } from "src/configuration/LoggingSettings";
import { AWSSettings } from "src/configuration/AWSSettings";

describe("KinesisStream", () => {
  let actual: KinesisStream;

  describe("constructor", () => {
    it("should create a Kinesis stream", () => {
      const loggingConfiguration = new LoggingSettings({
        LOG_TO_KINESIS: "test-stream",
        LOG_TO_KINESIS_LEVEL: LogLevel.FATAL,
        LOG_TO_KINESIS_LOG_TYPE: "test"
      });
      const awsConfiguration = new AWSSettings({});

      actual = new KinesisStream(loggingConfiguration, awsConfiguration);
      expect(actual.stream).toBeDefined();
      expect(actual.name).toEqual("kinesis");
      expect(actual.level).toEqual(loggingConfiguration.kinesisLogLevel);
      expect(actual.logType).toEqual(loggingConfiguration.kinesisLogType);
    });
  });
});
