"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogLevel_1 = require("src/configuration/LogLevel");
var LoggingSettings_1 = require("src/configuration/LoggingSettings");
var FileStream_1 = require("src/logging/streams/FileStream");
describe("FileStream", function () {
    var actual;
    describe("constructor", function () {
        it("should create a file stream", function () {
            var configuration = new LoggingSettings_1.LoggingSettings({ LOG_LEVEL: LogLevel_1.default.DEBUG, LOG_FILE: "test-file" });
            actual = new FileStream_1.FileStream(configuration);
            expect(actual.path).toEqual(configuration.logFilename);
            expect(actual.level).toEqual(configuration.logLevel);
            expect(actual.name).toEqual("file-stream");
        });
    });
});
