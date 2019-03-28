"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon = require("sinon");
var LogLevel_1 = require("src/configuration/LogLevel");
var LoggingSettings_1 = require("src/configuration/LoggingSettings");
var ConsoleStream_1 = require("src/logging/streams/ConsoleStream");
describe("ConsoleStream", function () {
    var actual;
    describe("constructor", function () {
        describe("default values", function () {
            it("should create a process stdout stream", function () {
                var configuration = new LoggingSettings_1.LoggingSettings({ LOG_LEVEL: LogLevel_1.default.INFO, CONSOLE_NICE_FORMAT: false });
                actual = new ConsoleStream_1.ConsoleStream(configuration);
                expect(actual.name).toEqual("console-stream");
                expect(actual.stream).toEqual(process.stdout);
                expect(actual.level).toEqual(configuration.logLevel);
            });
        });
        describe("using console formatting", function () {
            it("should create a bunyan stream", function () {
                var configuration = new LoggingSettings_1.LoggingSettings({ LOG_LEVEL: LogLevel_1.default.INFO, CONSOLE_NICE_FORMAT: true });
                var fakeBunyanStream = { stdin: { test: true } };
                var spawnMock = sinon.stub().returns(fakeBunyanStream);
                actual = new ConsoleStream_1.ConsoleStream(configuration, spawnMock);
                expect(actual.name).toEqual("console-stream");
                expect(actual.stream).toEqual(fakeBunyanStream.stdin);
                expect(actual.level).toEqual(configuration.logLevel);
            });
        });
    });
});
