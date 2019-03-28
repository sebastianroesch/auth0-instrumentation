"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Configuration_1 = require("./configuration/Configuration");
var Logger_1 = require("./logging/Logger");
var Agent = /** @class */ (function () {
    function Agent() {
        this.initialized = false;
        // Declare Stubs
    }
    Agent.prototype.init = function (packageInfo, env, serializers, params) {
        var _this = this;
        if (this.initialized) {
            return;
        }
        var configuration = new Configuration_1.default(env, packageInfo);
        this.logger = Logger_1.Logger.build(configuration, packageInfo, serializers);
        // Hello
        if (params && params.fileRotationSignal && env.LOG_FILE) {
            process.on(params.fileRotationSignal, function () {
                _this.logger.reopenFileStreams();
                _this.logger.info("The log file has been rotated.");
            });
        }
    };
    return Agent;
}());
exports.Agent = Agent;
