"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var omit = require("lodash.omit");
var SentryError_1 = require("./SentryError");
/**
 * Auth0-specific Sentry stream for Bunyan, forked from https://github.com/transcovo/bunyan-sentry-stream/blob/bf4a9d2262b7854aff6eb757b45565abc664e103/lib/SentryStream.js.
 */
var Auth0SentryStream = /** @class */ (function () {
    function Auth0SentryStream(client) {
        this.client = client;
    }
    /**
     * Method call by Bunyan to save log record
     */
    Auth0SentryStream.prototype.write = function (record) {
        var err = record.err;
        var tags = record.tags || {};
        var level = this.getSentryLevel(record);
        if (record.hasOwnProperty("log_type")) {
            tags.log_type = record.log_type;
        }
        if (err && level !== "info") {
            var extra = omit(record, "err", "tags");
            this.client.captureException(this.deserializeError(err), { extra: extra, level: level, tags: tags });
        }
        else {
            var extra = omit(record, "msg", "tags");
            this.client.captureMessage(record.msg, { extra: extra, level: level, tags: tags });
        }
        return true;
    };
    /**
     * Convert Bunyan level number to Sentry level label.
     * Rule : >50=error ; 40=warning ; info otherwise
     * @param  {Object} record Bunyan log record
     * @return {String}        Sentry level
     */
    Auth0SentryStream.prototype.getSentryLevel = function (record) {
        var level = record.level;
        if (level >= 50) {
            return "error";
        }
        if (level === 40) {
            return "warning";
        }
        return "info";
    };
    /**
     * Error deserialiazing function. Bunyan serialize the error to object : https://github.com/trentm/node-bunyan/blob/master/lib/bunyan.js#L1089
     * @param  {object} data serialized Bunyan
     * @return {Error}      the deserialiazed error
     */
    Auth0SentryStream.prototype.deserializeError = function (data) {
        if (data instanceof Error) {
            return data;
        }
        var error = new SentryError_1.SentryError(data.message);
        error.name = data.name;
        error.stack = data.stack;
        error.code = data.code;
        error.signal = data.signal;
        return error;
    };
    return Auth0SentryStream;
}());
exports.Auth0SentryStream = Auth0SentryStream;
/**
 * Default module function
 * @param  {Object} client Sentry client
 * @param  {String} level Bunyan level
 * @return {Object}        Bunyan stream with embedded Sentry steam
 */
function defaultSetup(client, level) {
    return {
        stream: new Auth0SentryStream(client),
        type: "raw",
        level: level || "warn"
    };
}
exports.defaultSetup = defaultSetup;
