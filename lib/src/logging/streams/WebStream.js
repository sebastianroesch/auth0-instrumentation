"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonLogging = require("auth0-common-logging");
var WebStream = /** @class */ (function () {
    function WebStream(configuration) {
        this.name = "web-url";
        this.stream = new CommonLogging.Streams.HttpWritableStream(configuration.logWebUrl);
        this.level = configuration.logWebLevel;
    }
    return WebStream;
}());
exports.WebStream = WebStream;
