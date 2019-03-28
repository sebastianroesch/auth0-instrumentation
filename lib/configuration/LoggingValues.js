"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogLevel_1 = require("./LogLevel");
var LoggingValues = /** @class */ (function () {
    function LoggingValues(env) {
        this.serviceName = env.SERVICE_NAME;
        this.logFilename = env.LOG_FILE;
        this.logLevel = env.CONSOLE_LOG_LEVEL || env.LOG_LEVEL || LogLevel_1.default.ERROR;
        this.useConsoleNiceFormat = env.CONSOLE_NICE_FORMAT;
        this.logWebUrl = env.LOG_TO_WEB_URL;
        this.logWebLevel = env.LOG_TO_WEB_LEVEL || LogLevel_1.default.ERROR;
        this.sentryUrl = env.ERROR_REPORTER_URL;
        this.sentryLogLevel = env.ERROR_REPORTER_LOG_LEVEL || LogLevel_1.default.ERROR;
        this.kinesisStream = env.LOG_TO_KINESIS;
        this.kinesisLogLevel = env.LOG_TO_KINESIS_LEVEL || LogLevel_1.default.ERROR;
        this.kinesisLogType = env.LOG_TO_KINESIS_LOG_TYPE;
        this.kinesisObjectMode = typeof env.KINESIS_OBJECT_MODE !== "undefined" ? env.KINESIS_OBJECT_MODE : true;
        this.buffer = {
            timeout: env.KINESIS_TIMEOUT || 5,
            length: env.KINESIS_LENGTH || 50,
            isPrioritaryMsg: function (entry) {
                return entry.level >= 40;
            }
        };
        this.ignoreProcessInfo = env.IGNORE_PROCESS_INFO;
        this.isProduction = process.env.NODE_ENV === "production";
    }
    return LoggingValues;
}());
exports.LoggingValues = LoggingValues;
