"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DecoratedBunyan_1 = require("./DecoratedBunyan");
function decorateLogger(logger) {
    var createChildLoggerFactory = function (parentLogger) {
        return function child(childOptions, simple) {
            return exports.decorateLogger(parentLogger.child(childOptions, simple));
        };
    };
    var createLogFormatter = function (parentLogger, lvl) {
        return function formatLog() {
            var args = Array.from(arguments);
            if (typeof args[0] === "string" && typeof args[1] !== "string") {
                var swap = args[0];
                args[0] = args[1] || {};
                args[1] = swap;
            }
            return parentLogger[lvl].apply(parentLogger, args);
        };
    };
    var decoratedBunyan = new DecoratedBunyan_1.DecoratedBunyan();
    decoratedBunyan.child = createChildLoggerFactory(logger);
    decoratedBunyan.trace = createLogFormatter(logger, "trace");
    decoratedBunyan.debug = createLogFormatter(logger, "debug");
    decoratedBunyan.info = createLogFormatter(logger, "info");
    decoratedBunyan.warn = createLogFormatter(logger, "warn");
    decoratedBunyan.error = createLogFormatter(logger, "error");
    decoratedBunyan.fatal = createLogFormatter(logger, "fatal");
    decoratedBunyan.reopenFileStreams = function () {
        if (!logger || !logger.reopenFileStreams) {
            return;
        }
        logger.reopenFileStreams();
    };
    return decoratedBunyan;
}
exports.decorateLogger = decorateLogger;
