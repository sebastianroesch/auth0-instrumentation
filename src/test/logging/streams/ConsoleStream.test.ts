import * as sinon from "sinon";
import LogLevel from "src/configuration/LogLevel";
import { LoggingSettings } from "src/configuration/LoggingSettings";
import { ConsoleStream } from "src/logging/streams/ConsoleStream";

describe("ConsoleStream", () => {
  let actual: ConsoleStream;

  describe("constructor", () => {
    describe("default values", () => {
      it("should create a process stdout stream", () => {
        const configuration = new LoggingSettings({ LOG_LEVEL: LogLevel.INFO, CONSOLE_NICE_FORMAT: false });

        actual = new ConsoleStream(configuration);
        expect(actual.name).toEqual("console-stream");
        expect(actual.stream).toEqual(process.stdout);
        expect(actual.level).toEqual(configuration.logLevel);
      });
    });

    describe("using console formatting", () => {
      it("should create a bunyan stream", () => {
        const configuration = new LoggingSettings({ LOG_LEVEL: LogLevel.INFO, CONSOLE_NICE_FORMAT: true });
        const fakeBunyanStream = { stdin: { test: true } };
        const spawnMock = sinon.stub().returns(fakeBunyanStream);

        actual = new ConsoleStream(configuration, spawnMock);
        expect(actual.name).toEqual("console-stream");
        expect(actual.stream).toEqual(fakeBunyanStream.stdin);
        expect(actual.level).toEqual(configuration.logLevel);
      });
    });
  });
});
