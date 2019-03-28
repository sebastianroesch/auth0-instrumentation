"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var KinesisStream_1 = require("src/logging/streams/KinesisStream");
var LogLevel_1 = require("src/configuration/LogLevel");
var LoggingSettings_1 = require("src/configuration/LoggingSettings");
var AWSSettings_1 = require("src/configuration/AWSSettings");
describe("KinesisStream", function () {
    var actual;
    describe("constructor", function () {
        it("should create a Kinesis stream", function () {
            var loggingConfiguration = new LoggingSettings_1.LoggingSettings({
                LOG_TO_KINESIS: "test-stream",
                LOG_TO_KINESIS_LEVEL: LogLevel_1.default.FATAL,
                LOG_TO_KINESIS_LOG_TYPE: "test"
            });
            var awsConfiguration = new AWSSettings_1.AWSSettings({});
            actual = new KinesisStream_1.KinesisStream(loggingConfiguration, awsConfiguration);
            chai_1.expect(actual.stream).toBeDefined();
            chai_1.expect(actual.name).toEqual("kinesis");
            chai_1.expect(actual.level).toEqual(loggingConfiguration.kinesisLogLevel);
            chai_1.expect(actual.logType).toEqual(loggingConfiguration.kinesisLogType);
        });
    });
});
