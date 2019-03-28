import { EnvironmentVariables } from "src/configuration/EnvironmentVariables";
import { LoggingSettings } from "src/configuration/LoggingSettings";
import LogLevel from "src/configuration/LogLevel";

describe("LoggingValues", () => {
  let environment: EnvironmentVariables;
  let actual: LoggingSettings;

  describe("constructor", () => {
    it("should map variables correctly", () => {
      environment = new EnvironmentVariables();
      environment.LOG_FILE = "test-file";
      environment.CONSOLE_LOG_LEVEL = LogLevel.ERROR;
      environment.LOG_LEVEL = LogLevel.INFO;
      environment.CONSOLE_NICE_FORMAT = true;
      environment.LOG_TO_WEB_URL = "web-url";
      environment.LOG_TO_WEB_LEVEL = LogLevel.DEBUG;
      environment.ERROR_REPORTER_URL = "reporter-url";
      environment.ERROR_REPORTER_LOG_LEVEL = LogLevel.INFO;
      environment.LOG_TO_KINESIS = "kinesis-name";
      environment.LOG_TO_KINESIS_LEVEL = LogLevel.FATAL;
      environment.LOG_TO_KINESIS_LOG_TYPE = "log-type";
      environment.IGNORE_PROCESS_INFO = false;
      environment.KINESIS_OBJECT_MODE = "test";
      environment.KINESIS_LENGTH = 5;
      environment.KINESIS_TIMEOUT = 20;

      actual = new LoggingSettings(environment);
      expect(actual.logFilename).toEqual(environment.LOG_FILE);
      // CONSOLE_LOG_LEVEL takes precedence over LOG_LEVEL
      expect(actual.logLevel).toEqual(environment.CONSOLE_LOG_LEVEL);
      expect(actual.useConsoleNiceFormat).toEqual(environment.CONSOLE_NICE_FORMAT);
      expect(actual.logWebUrl).toEqual(environment.LOG_TO_WEB_URL);
      expect(actual.logWebLevel).toEqual(environment.LOG_TO_WEB_LEVEL);
      expect(actual.sentryUrl).toEqual(environment.ERROR_REPORTER_URL);
      expect(actual.sentryLogLevel).toEqual(environment.ERROR_REPORTER_LOG_LEVEL);
      expect(actual.kinesisStream).toEqual(environment.LOG_TO_KINESIS);
      expect(actual.kinesisLogType).toEqual(environment.LOG_TO_KINESIS_LOG_TYPE);
      expect(actual.kinesisLogLevel).toEqual(environment.LOG_TO_KINESIS_LEVEL);
      expect(actual.ignoreProcessInfo).toEqual(environment.IGNORE_PROCESS_INFO);
      expect(actual.kinesisObjectMode).toEqual(environment.KINESIS_OBJECT_MODE);
      expect(actual.buffer.timeout).toEqual(environment.KINESIS_TIMEOUT);
      expect(actual.buffer.length).toEqual(environment.KINESIS_LENGTH);
    });

    it("should set the default log level if not specified", () => {
      environment = new EnvironmentVariables();

      // Change LOG_LEVEL precedence
      environment.LOG_LEVEL = undefined;
      actual = new LoggingSettings(environment);
      expect(actual.logLevel).toEqual(LogLevel.ERROR);
    });

    it("should set the default object mode if none specified", () => {
      environment = new EnvironmentVariables();
      environment.KINESIS_OBJECT_MODE = undefined;
      actual = new LoggingSettings(environment);
      expect(actual.kinesisObjectMode).toEqual(true);
    });

    it("should set default buffer values if none are specified", () => {
      environment = new EnvironmentVariables();
      environment.KINESIS_LENGTH = undefined;
      environment.KINESIS_TIMEOUT = undefined;

      actual = new LoggingSettings(environment);
      expect(actual.buffer.timeout).toEqual(5);
      expect(actual.buffer.length).toEqual(50);
    });
  });

  describe("buffer.isPrioritaryMsg", () => {
    it("should return true if level is above 40", () => {
      environment = new EnvironmentVariables();
      actual = new LoggingSettings(environment);

      expect(actual.buffer).toBeDefined();
      expect(actual.buffer.isPrioritaryMsg({ level: 40 })).toEqual(true);
      expect(actual.buffer.isPrioritaryMsg({ level: 50 })).toEqual(true);
    });

    it("should return false if level is below 40", () => {
      environment = new EnvironmentVariables();
      actual = new LoggingSettings(environment);

      expect(actual.buffer.isPrioritaryMsg({ level: 40 })).toEqual(true);
      expect(actual.buffer.isPrioritaryMsg({ level: 39 })).toEqual(false);
      expect(actual.buffer.isPrioritaryMsg({ level: 0 })).toEqual(false);
    });
  });
});
