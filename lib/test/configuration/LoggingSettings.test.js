"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnvironmentVariables_1 = require("src/configuration/EnvironmentVariables");
var LoggingSettings_1 = require("src/configuration/LoggingSettings");
var LogLevel_1 = require("src/configuration/LogLevel");
describe("LoggingValues", function () {
    var environment;
    var actual;
    describe("constructor", function () {
        it("should map variables correctly", function () {
            environment = new EnvironmentVariables_1.EnvironmentVariables();
            environment.LOG_FILE = "test-file";
            environment.CONSOLE_LOG_LEVEL = LogLevel_1.default.ERROR;
            environment.LOG_LEVEL = LogLevel_1.default.INFO;
            environment.CONSOLE_NICE_FORMAT = true;
            environment.LOG_TO_WEB_URL = "web-url";
            environment.LOG_TO_WEB_LEVEL = LogLevel_1.default.DEBUG;
            environment.ERROR_REPORTER_URL = "reporter-url";
            environment.ERROR_REPORTER_LOG_LEVEL = LogLevel_1.default.INFO;
            environment.LOG_TO_KINESIS = "kinesis-name";
            environment.LOG_TO_KINESIS_LEVEL = LogLevel_1.default.FATAL;
            environment.LOG_TO_KINESIS_LOG_TYPE = "log-type";
            environment.IGNORE_PROCESS_INFO = false;
            environment.KINESIS_OBJECT_MODE = "test";
            environment.KINESIS_LENGTH = 5;
            environment.KINESIS_TIMEOUT = 20;
            actual = new LoggingSettings_1.LoggingSettings(environment);
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
        it("should set the default log level if not specified", function () {
            environment = new EnvironmentVariables_1.EnvironmentVariables();
            // Change LOG_LEVEL precedence
            environment.LOG_LEVEL = undefined;
            actual = new LoggingSettings_1.LoggingSettings(environment);
            expect(actual.logLevel).toEqual(LogLevel_1.default.ERROR);
        });
        it("should set the default object mode if none specified", function () {
            environment = new EnvironmentVariables_1.EnvironmentVariables();
            environment.KINESIS_OBJECT_MODE = undefined;
            actual = new LoggingSettings_1.LoggingSettings(environment);
            expect(actual.kinesisObjectMode).toEqual(true);
        });
        it("should set default buffer values if none are specified", function () {
            environment = new EnvironmentVariables_1.EnvironmentVariables();
            environment.KINESIS_LENGTH = undefined;
            environment.KINESIS_TIMEOUT = undefined;
            actual = new LoggingSettings_1.LoggingSettings(environment);
            expect(actual.buffer.timeout).toEqual(5);
            expect(actual.buffer.length).toEqual(50);
        });
    });
    describe("buffer.isPrioritaryMsg", function () {
        it("should return true if level is above 40", function () {
            environment = new EnvironmentVariables_1.EnvironmentVariables();
            actual = new LoggingSettings_1.LoggingSettings(environment);
            expect(actual.buffer).toBeDefined();
            expect(actual.buffer.isPrioritaryMsg({ level: 40 })).toEqual(true);
            expect(actual.buffer.isPrioritaryMsg({ level: 50 })).toEqual(true);
        });
        it("should return false if level is below 40", function () {
            environment = new EnvironmentVariables_1.EnvironmentVariables();
            actual = new LoggingSettings_1.LoggingSettings(environment);
            expect(actual.buffer.isPrioritaryMsg({ level: 40 })).toEqual(true);
            expect(actual.buffer.isPrioritaryMsg({ level: 39 })).toEqual(false);
            expect(actual.buffer.isPrioritaryMsg({ level: 0 })).toEqual(false);
        });
    });
});
