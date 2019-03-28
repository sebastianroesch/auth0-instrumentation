"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon = require("sinon");
var hapiErrorReporterBuilder_1 = require("src/logging/streams/hapiErrorReporterBuilder");
describe("hapiErrorReporterBuilder", function () {
    var actual;
    describe("importing", function () {
        it("should return a callback function for HAPI.js", function () {
            actual = hapiErrorReporterBuilder_1.hapiErrorReporterBuilder({}, {});
            expect(actual).toBeDefined();
        });
    });
    describe("imported callback", function () {
        it("should capture errors for hapi >= 17", function () {
            var clientMock = { captureError: sinon.spy() };
            var fakeRequest = {
                method: "GET",
                path: "/test",
                pre: { _originalPayload: {} },
                query: "test=1",
                raw: {
                    req: {
                        headers: { "user-agent": "test-agent" }
                    }
                },
                info: { id: "test", remoteAddress: "192.168.1.1", received: true }
            };
            var fakeEvent = {
                isBoom: false,
                error: new Error("test error")
            };
            var fakeOptions = { tags: { test1: true, test2: "test" } };
            var expectedReport = {
                extra: {
                    timestamp: fakeRequest.info.received,
                    id: fakeRequest.info.id,
                    method: fakeRequest.method,
                    path: fakeRequest.path,
                    payload: fakeRequest.pre && fakeRequest.pre._originalPayload,
                    query: fakeRequest.query,
                    remoteAddress: fakeRequest.info.remoteAddress,
                    userAgent: fakeRequest.raw.req.headers["user-agent"]
                },
                tags: fakeOptions.tags
            };
            actual = hapiErrorReporterBuilder_1.hapiErrorReporterBuilder(clientMock, fakeOptions);
            actual(fakeRequest, fakeEvent);
            expect(clientMock.captureError.calledOnce);
            expect(clientMock.captureError.calledWith(fakeEvent.error, expectedReport));
        });
        it("should capture errors for hapi < 17", function () {
            var clientMock = { captureError: sinon.spy() };
            var fakeRequest = {
                id: "test",
                method: "GET",
                path: "/test",
                pre: { _originalPayload: {} },
                query: "test=1",
                raw: {
                    req: {
                        headers: { "user-agent": "test-agent" }
                    }
                },
                info: { remoteAddress: "192.168.1.1", received: true }
            };
            var fakeEvent = {
                isBoom: true,
                msg: "error"
            };
            var fakeOptions = { tags: { test1: true, test2: "test" } };
            var expectedReport = {
                extra: {
                    timestamp: fakeRequest.info.received,
                    id: fakeRequest.id,
                    method: fakeRequest.method,
                    path: fakeRequest.path,
                    payload: fakeRequest.pre && fakeRequest.pre._originalPayload,
                    query: fakeRequest.query,
                    remoteAddress: fakeRequest.info.remoteAddress,
                    userAgent: fakeRequest.raw.req.headers["user-agent"]
                },
                tags: fakeOptions.tags
            };
            actual = hapiErrorReporterBuilder_1.hapiErrorReporterBuilder(clientMock, fakeOptions);
            actual(fakeRequest, fakeEvent);
            expect(clientMock.captureError.calledOnce);
            expect(clientMock.captureError.calledWith(fakeEvent, expectedReport));
        });
    });
});
