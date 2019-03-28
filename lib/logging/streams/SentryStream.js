"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorReporter_1 = require("./errorReporter");
var Auth0SentryStream_1 = require("./Auth0SentryStream");
var SentryStream = /** @class */ (function () {
    function SentryStream(configuration) {
        var errorReporter = errorReporter_1.buildErrorReporter(configuration);
        this.name = "sentry";
        this.type = "raw";
        this.stream = new Auth0SentryStream_1.Auth0SentryStream(errorReporter);
        this.level = configuration.sentryLogLevel;
    }
    return SentryStream;
}());
exports.SentryStream = SentryStream;
