"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function kinesisErrorHandler(err) {
    var errorMessages = ["Error on writing logs to Kinesis"];
    if (err) {
        errorMessages.push(JSON.stringify({
            message: err.message,
            records: err.records,
            stack: err.stack
        }));
    }
    console.error.apply(this, errorMessages);
}
exports.kinesisErrorHandler = kinesisErrorHandler;
function webErrorHandler(err) {
    var errorMessages = ["Error on writing logs to web url"];
    if (err) {
        errorMessages.push(JSON.stringify({
            message: err.message,
            stack: err.stack
        }));
    }
    console.error.apply(this, errorMessages);
}
exports.webErrorHandler = webErrorHandler;
