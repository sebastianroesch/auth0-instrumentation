"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConsoleStream_1 = require("./ConsoleStream");
var FileStream_1 = require("./FileStream");
var WebStream_1 = require("./WebStream");
var KinesisStream_1 = require("./KinesisStream");
var SentryStream_1 = require("./SentryStream");
var StreamBuilder = /** @class */ (function () {
    function StreamBuilder() {
    }
    StreamBuilder.getStreams = function (configuration) {
        var streams = [];
        if (configuration.logging.logFilename) {
            streams.push(new FileStream_1.FileStream(configuration.logging));
        }
        else {
            streams.push(new ConsoleStream_1.ConsoleStream(configuration.logging));
        }
        if (configuration.logging.isProduction && configuration.logging.logWebUrl) {
            streams.push(new WebStream_1.WebStream(configuration.logging));
        }
        if (configuration.logging.kinesisStream) {
            streams.push(new KinesisStream_1.KinesisStream(configuration.logging, configuration.aws));
        }
        streams.push(new SentryStream_1.SentryStream(configuration.logging));
        return streams;
    };
    return StreamBuilder;
}());
exports.StreamBuilder = StreamBuilder;
