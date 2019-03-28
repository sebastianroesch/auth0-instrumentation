"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hapiErrorReporterBuilder_1 = require("./hapiErrorReporterBuilder");
function hapiPluginBuilder(client) {
    var plugin = {
        pkg: require("../../../package.json"),
        register: function (server, options, next) {
            var hapiVersion = server.version || ""; // '17.0.0'
            // tslint:disable-next-line: radix
            var majorHapiVersion = parseInt(hapiVersion.split(".")[0]);
            var errorReporter = hapiErrorReporterBuilder_1.hapiErrorReporterBuilder(client, options);
            server.expose("client", client);
            // depending on the hapi version use a different way to listen to the event
            if (majorHapiVersion >= 17) {
                server.events.on({ name: "request", channels: "error" }, errorReporter);
            }
            else {
                server.on("request-error", errorReporter);
                next();
            }
        }
    };
    return plugin;
}
exports.hapiPluginBuilder = hapiPluginBuilder;
