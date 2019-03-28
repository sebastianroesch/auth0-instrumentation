"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KinesisOptions = /** @class */ (function () {
    function KinesisOptions(loggingConfiguration, awsConfiguration, keepAliveAgent) {
        this.accessKeyId = awsConfiguration.accessKeyId;
        this.secretAccessKey = awsConfiguration.accessKeySecret;
        this.sessionToken = awsConfiguration.sessionToken;
        this.credentials = awsConfiguration.credentials;
        this.streamName = loggingConfiguration.kinesisStream;
        this.region = awsConfiguration.region;
        this.partitionKey = function getPartitionKey() {
            return Date.now().toString() + Math.random();
        };
        this.httpOptions = {
            agent: keepAliveAgent
        };
        this.objectMode = loggingConfiguration.kinesisObjectMode;
        this.buffer = loggingConfiguration.buffer;
    }
    return KinesisOptions;
}());
exports.KinesisOptions = KinesisOptions;
