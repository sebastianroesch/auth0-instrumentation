"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth0_common_logging_1 = require("auth0-common-logging");
var auth0_common_logging_2 = require("auth0-common-logging");
var bunyan = require("bunyan");
var Utils_1 = require("./Utils");
var StreamBuilder_1 = require("./streams/StreamBuilder");
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.build = function (configuration, packageInfo, serializers) {
        if (!serializers) {
            serializers = auth0_common_logging_2.Serializers;
        }
        var streams = StreamBuilder_1.StreamBuilder.getStreams(configuration);
        var process_info = auth0_common_logging_1.ProcessInfo && !configuration.logging.ignoreProcessInfo && auth0_common_logging_1.ProcessInfo.version !== "0.0.0"
            ? auth0_common_logging_1.ProcessInfo
            : undefined;
        var logger = bunyan.createLogger({
            name: packageInfo.name,
            process: process_info,
            region: configuration.aws.region,
            service_name: configuration.logging.serviceName || packageInfo.name,
            environment: configuration.aws.environment,
            purpose: configuration.aws.purpose,
            channel: configuration.aws.releaseChannel,
            streams: streams,
            serializers: serializers
        });
        logger.on("error", function (err, stream) {
            console.error("Cannot write to log stream " + stream.name + " " + (err && err.message));
        });
        return Utils_1.decorateLogger(logger);
    };
    return Logger;
}());
exports.Logger = Logger;
