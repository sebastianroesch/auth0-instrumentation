"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hapiPluginBuilder_1 = require("./hapiPluginBuilder");
var raven = require("raven");
var Stubs_1 = require("../../Stubs");
function buildErrorReporter(configuration) {
    if (!configuration.sentryUrl) {
        return Stubs_1.emptyErrorReporter;
    }
    var client = new raven.Client(configuration.sentryUrl);
    client.hapi = {
        plugin: hapiPluginBuilder_1.hapiPluginBuilder(client)
    };
    client.express = {
        requestHandler: raven.middleware.express.requestHandler(configuration.sentryUrl),
        errorHandler: raven.middleware.express.errorHandler(configuration.sentryUrl)
    };
    client.isActive = true;
    return client;
}
exports.buildErrorReporter = buildErrorReporter;
