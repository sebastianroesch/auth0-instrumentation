"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AWSValues = /** @class */ (function () {
    function AWSValues(env) {
        this.region = env.AWS_REGION;
        this.environment = env.ENVIRONMENT;
        this.purpose = env.PURPOSE;
        this.releaseChannel = env.RELEASE_CHANNEL;
        this.accessKeyId = env.AWS_ACCESS_KEY_ID;
        this.accessKeySecret = env.AWS_ACCESS_KEY_SECRET;
        this.sessionToken = env.AWS_SESSION_TOKEN;
        this.credentials = env.AWS_CREDENTIALS;
    }
    return AWSValues;
}());
exports.AWSValues = AWSValues;
