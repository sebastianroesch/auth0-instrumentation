"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon = require("sinon");
var Auth0SentryStream_1 = require("src/logging/streams/Auth0SentryStream");
var SentryError_1 = require("src/logging/streams/SentryError");
describe("Auth0SentryStream", function () {
    var actual;
    describe("constructor", function () {
        it("saves client", function () {
            var expected = { test: true };
            actual = new Auth0SentryStream_1.Auth0SentryStream(expected);
            expect(actual.client).toEqual(expected);
        });
    });
    describe("write record", function () {
        describe("without level info", function () {
            it("should capture exception using 'warning'", function () {
                var mockClient = { captureMessage: sinon.spy(), captureException: sinon.spy() };
                var testRecord = { level: 40, err: new Error("test"), extraParam: "test" };
                actual = new Auth0SentryStream_1.Auth0SentryStream(mockClient);
                actual.write(testRecord);
                expect(mockClient.captureException.calledOnce).toEqual(true);
                expect(mockClient.captureException.calledWith(testRecord.err, {
                    extra: { level: testRecord.level, extraParam: testRecord.extraParam },
                    level: "warning",
                    tags: {}
                })).toEqual(true);
                expect(mockClient.captureMessage.notCalled).toEqual(true);
            });
            it("should capture exception using level above warning", function () {
                var mockClient = { captureMessage: sinon.spy(), captureException: sinon.spy() };
                var testRecord = { level: 60, err: new Error("test"), extraParam: "test" };
                actual = new Auth0SentryStream_1.Auth0SentryStream(mockClient);
                actual.write(testRecord);
                expect(mockClient.captureException.calledOnce).toEqual(true);
                expect(mockClient.captureException.calledWith(testRecord.err, {
                    extra: { level: testRecord.level, extraParam: testRecord.extraParam },
                    level: "error",
                    tags: {}
                })).toEqual(true);
                expect(mockClient.captureMessage.notCalled).toEqual(true);
            });
            it("should deserialize error data using level above warning", function () {
                var mockClient = { captureMessage: sinon.spy(), captureException: sinon.spy() };
                var testRecord = {
                    level: 60,
                    err: { name: "test", message: "test-error", stack: "stack", code: "10", signal: "no" },
                    extraParam: "test"
                };
                var expectedError = new SentryError_1.SentryError(testRecord.err.message);
                expectedError.name = testRecord.err.name;
                expectedError.stack = testRecord.err.stack;
                expectedError.code = testRecord.err.code;
                expectedError.signal = testRecord.err.signal;
                actual = new Auth0SentryStream_1.Auth0SentryStream(mockClient);
                actual.write(testRecord);
                expect(mockClient.captureException.calledOnce).toEqual(true);
                expect(mockClient.captureException.getCall(0).args[0]).toEqual(expectedError);
                expect(mockClient.captureException.getCall(0).args[1]).toEqual({
                    extra: { level: testRecord.level, extraParam: testRecord.extraParam },
                    level: "error",
                    tags: {}
                });
                expect(mockClient.captureMessage.notCalled).toEqual(true);
            });
        });
        describe("with level info", function () {
            it("should capture message", function () {
                var mockClient = { captureMessage: sinon.spy(), captureException: sinon.spy() };
                var testRecord = { level: 10, msg: "test", extraParam: "test" };
                actual = new Auth0SentryStream_1.Auth0SentryStream(mockClient);
                actual.write(testRecord);
                expect(mockClient.captureMessage.calledOnce).toEqual(true);
                expect(mockClient.captureMessage.calledWith(testRecord.msg, {
                    extra: { level: testRecord.level, extraParam: testRecord.extraParam },
                    level: "info",
                    tags: {}
                })).toEqual(true);
                expect(mockClient.captureException.notCalled).toEqual(true);
            });
            it("should capture message with tags", function () {
                var mockClient = { captureMessage: sinon.spy(), captureException: sinon.spy() };
                var testRecord = { level: 10, msg: "test", extraParam: "test", tags: { t1: "t1", t2: "t2" } };
                actual = new Auth0SentryStream_1.Auth0SentryStream(mockClient);
                actual.write(testRecord);
                expect(mockClient.captureMessage.calledOnce).toEqual(true);
                expect(mockClient.captureMessage.calledWith(testRecord.msg, {
                    extra: { level: testRecord.level, extraParam: testRecord.extraParam },
                    level: "info",
                    tags: testRecord.tags
                })).toEqual(true);
                expect(mockClient.captureException.notCalled).toEqual(true);
            });
            it("should capture message with log_type", function () {
                var mockClient = { captureMessage: sinon.spy(), captureException: sinon.spy() };
                var testRecord = {
                    level: 10,
                    msg: "test",
                    extraParam: "test",
                    log_type: "test",
                    tags: { t1: "t1", t2: "t2", log_type: "test" }
                };
                actual = new Auth0SentryStream_1.Auth0SentryStream(mockClient);
                actual.write(testRecord);
                expect(mockClient.captureMessage.calledOnce).toEqual(true);
                expect(mockClient.captureMessage.calledWith(testRecord.msg, {
                    extra: { level: testRecord.level, log_type: "test", extraParam: testRecord.extraParam },
                    level: "info",
                    tags: testRecord.tags
                })).toEqual(true);
                expect(mockClient.captureException.notCalled).toEqual(true);
            });
        });
    });
});
