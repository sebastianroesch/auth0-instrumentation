import * as sinon from "sinon";
import { hapiErrorReporterBuilder } from "src/logging/streams/hapiErrorReporterBuilder";

describe("hapiErrorReporterBuilder", () => {
  let actual: (request: any, event: any) => void;

  describe("importing", () => {
    it("should return a callback function for HAPI.js", () => {
      actual = hapiErrorReporterBuilder({}, {});
      expect(actual).toBeDefined();
    });
  });

  describe("imported callback", () => {
    it("should capture errors for hapi >= 17", () => {
      const clientMock = { captureError: sinon.spy() };
      const fakeRequest = {
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
      const fakeEvent = {
        isBoom: false,
        error: new Error("test error")
      };
      const fakeOptions = { tags: { test1: true, test2: "test" } };
      const expectedReport = {
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

      actual = hapiErrorReporterBuilder(clientMock, fakeOptions);
      actual(fakeRequest, fakeEvent);
      expect(clientMock.captureError.calledOnce);
      expect(clientMock.captureError.calledWith(fakeEvent.error, expectedReport));
    });

    it("should capture errors for hapi < 17", () => {
      const clientMock = { captureError: sinon.spy() };
      const fakeRequest = {
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
      const fakeEvent = {
        isBoom: true,
        msg: "error"
      };
      const fakeOptions = { tags: { test1: true, test2: "test" } };
      const expectedReport = {
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

      actual = hapiErrorReporterBuilder(clientMock, fakeOptions);
      actual(fakeRequest, fakeEvent);
      expect(clientMock.captureError.calledOnce);
      expect(clientMock.captureError.calledWith(fakeEvent, expectedReport));
    });
  });
});
