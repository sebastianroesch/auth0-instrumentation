"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KinesisOptions_1 = require("src/logging/streams/KinesisOptions");
var LoggingSettings_1 = require("src/configuration/LoggingSettings");
var AWSSettings_1 = require("src/configuration/AWSSettings");
describe("buildKinesisOptions", function () {
    var actual;
    it("should convert configuration values into kinesis options object", function () {
        var loggingConfiguration = new LoggingSettings_1.LoggingSettings({
            KINESIS_OBJECT_MODE: "test",
            LOG_TO_KINESIS: "test-stream"
        });
        var awsConfiguration = new AWSSettings_1.AWSSettings({
            AWS_ACCESS_KEY_ID: "test-key",
            AWS_ACCESS_KEY_SECRET: "test-secret",
            AWS_SESSION_TOKEN: "token",
            AWS_CREDENTIALS: "test@test",
            AWS_REGION: "us-test"
        });
        actual = new KinesisOptions_1.KinesisOptions(loggingConfiguration, awsConfiguration, {});
        expect(actual.accessKeyId).toEqual(awsConfiguration.accessKeyId);
        expect(actual.secretAccessKey).toEqual(awsConfiguration.accessKeySecret);
        expect(actual.sessionToken).toEqual(awsConfiguration.sessionToken);
        expect(actual.credentials).toEqual(awsConfiguration.credentials);
        expect(actual.region).toEqual(awsConfiguration.region);
        expect(actual.streamName).toEqual(loggingConfiguration.kinesisStream);
        expect(actual.objectMode).toEqual(loggingConfiguration.kinesisObjectMode);
    });
});
