"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebStream_1 = require("src/logging/streams/WebStream");
var LoggingSettings_1 = require("src/configuration/LoggingSettings");
var LogLevel_1 = require("src/configuration/LogLevel");
describe("FileStream", function () {
    var actual;
    describe("constructor", function () {
        it("should create a file stream", function () {
            var configuration = new LoggingSettings_1.LoggingSettings({
                LOG_LEVEL: LogLevel_1.default.DEBUG,
                LOG_TO_WEB_URL: "test-file",
                LOG_TO_WEB_LEVEL: LogLevel_1.default.DEBUG
            });
            actual = new WebStream_1.WebStream(configuration);
            expect(actual.name).toEqual("web-url");
            expect(actual.stream).toBeDefined();
            expect(actual.level).toEqual(configuration.logWebLevel);
        });
    });
});
