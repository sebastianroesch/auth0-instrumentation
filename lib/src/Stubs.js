"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line: no-empty
exports.noop = function () { };
var emptyMiddleware = function (a, b, next) {
    if (next) {
        next();
    }
};
exports.emptyErrorReporter = {
    isActive: false,
    captureException: exports.noop,
    captureMessage: exports.noop,
    patchGlobal: exports.noop,
    hapi: {
        plugin: {
            register: emptyMiddleware,
            pkg: require("../package.json")
        }
    },
    express: {
        requestHandler: emptyMiddleware,
        errorHandler: emptyMiddleware
    }
};
