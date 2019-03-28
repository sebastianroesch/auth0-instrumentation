"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KinesisWritable = require("aws-kinesis-writable");
var KeepAliveAgent_1 = require("./KeepAliveAgent");
var KinesisOptions_1 = require("./KinesisOptions");
var error_handlers_1 = require("./error-handlers");
var KinesisStream = /** @class */ (function () {
    function KinesisStream(configuration, awsConfiguration) {
        var agent = KeepAliveAgent_1.buildKeepAliveAgent(configuration.isProduction);
        var stream = new KinesisWritable(new KinesisOptions_1.KinesisOptions(configuration, awsConfiguration, agent));
        stream.on("error", error_handlers_1.kinesisErrorHandler);
        this.name = "kinesis";
        this.stream = stream;
        this.level = configuration.kinesisLogLevel;
        if (configuration.kinesisLogType) {
            this.logType = configuration.kinesisLogType;
        }
    }
    return KinesisStream;
}());
exports.KinesisStream = KinesisStream;
