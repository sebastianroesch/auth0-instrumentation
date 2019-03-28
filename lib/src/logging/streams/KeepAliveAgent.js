"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var https = require("https");
function buildKeepAliveAgent(isProduction) {
    var options = { keepAlive: true };
    return isProduction ? new https.Agent(options) : new http.Agent(options);
}
exports.buildKeepAliveAgent = buildKeepAliveAgent;
