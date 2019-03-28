import * as sinon from "sinon";
import { Auth0SentryStream } from "src/logging/streams/Auth0SentryStream";
import { SentryError } from "src/logging/streams/SentryError";

describe("Auth0SentryStream", () => {
  let actual: Auth0SentryStream;

  describe("constructor", () => {
    it("saves client", () => {
      const expected = { test: true };

      actual = new Auth0SentryStream(expected);
      expect(actual.client).toEqual(expected);
    });
  });

  describe("write record", () => {
    describe("without level info", () => {
      it("should capture exception using 'warning'", () => {
        const mockClient = { captureMessage: sinon.spy(), captureException: sinon.spy() };
        const testRecord = { level: 40, err: new Error("test"), extraParam: "test" };

        actual = new Auth0SentryStream(mockClient);
        actual.write(testRecord);

        expect(mockClient.captureException.calledOnce).toEqual(true);
        expect(
          mockClient.captureException.calledWith(testRecord.err, {
            extra: { level: testRecord.level, extraParam: testRecord.extraParam },
            level: "warning",
            tags: {}
          })
        ).toEqual(true);
        expect(mockClient.captureMessage.notCalled).toEqual(true);
      });

      it("should capture exception using level above warning", () => {
        const mockClient = { captureMessage: sinon.spy(), captureException: sinon.spy() };
        const testRecord = { level: 60, err: new Error("test"), extraParam: "test" };

        actual = new Auth0SentryStream(mockClient);
        actual.write(testRecord);

        expect(mockClient.captureException.calledOnce).toEqual(true);
        expect(
          mockClient.captureException.calledWith(testRecord.err, {
            extra: { level: testRecord.level, extraParam: testRecord.extraParam },
            level: "error",
            tags: {}
          })
        ).toEqual(true);
        expect(mockClient.captureMessage.notCalled).toEqual(true);
      });

      it("should deserialize error data using level above warning", () => {
        const mockClient = { captureMessage: sinon.spy(), captureException: sinon.spy() };
        const testRecord = {
          level: 60,
          err: { name: "test", message: "test-error", stack: "stack", code: "10", signal: "no" },
          extraParam: "test"
        };
        const expectedError = new SentryError(testRecord.err.message);

        expectedError.name = testRecord.err.name;
        expectedError.stack = testRecord.err.stack;
        expectedError.code = testRecord.err.code;
        expectedError.signal = testRecord.err.signal;

        actual = new Auth0SentryStream(mockClient);
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

    describe("with level info", () => {
      it("should capture message", () => {
        const mockClient = { captureMessage: sinon.spy(), captureException: sinon.spy() };
        const testRecord = { level: 10, msg: "test", extraParam: "test" };

        actual = new Auth0SentryStream(mockClient);
        actual.write(testRecord);

        expect(mockClient.captureMessage.calledOnce).toEqual(true);
        expect(
          mockClient.captureMessage.calledWith(testRecord.msg, {
            extra: { level: testRecord.level, extraParam: testRecord.extraParam },
            level: "info",
            tags: {}
          })
        ).toEqual(true);
        expect(mockClient.captureException.notCalled).toEqual(true);
      });

      it("should capture message with tags", () => {
        const mockClient = { captureMessage: sinon.spy(), captureException: sinon.spy() };
        const testRecord = { level: 10, msg: "test", extraParam: "test", tags: { t1: "t1", t2: "t2" } };

        actual = new Auth0SentryStream(mockClient);
        actual.write(testRecord);

        expect(mockClient.captureMessage.calledOnce).toEqual(true);
        expect(
          mockClient.captureMessage.calledWith(testRecord.msg, {
            extra: { level: testRecord.level, extraParam: testRecord.extraParam },
            level: "info",
            tags: testRecord.tags
          })
        ).toEqual(true);
        expect(mockClient.captureException.notCalled).toEqual(true);
      });

      it("should capture message with log_type", () => {
        const mockClient = { captureMessage: sinon.spy(), captureException: sinon.spy() };
        const testRecord = {
          level: 10,
          msg: "test",
          extraParam: "test",
          log_type: "test",
          tags: { t1: "t1", t2: "t2", log_type: "test" }
        };

        actual = new Auth0SentryStream(mockClient);
        actual.write(testRecord);

        expect(mockClient.captureMessage.calledOnce).toEqual(true);
        expect(
          mockClient.captureMessage.calledWith(testRecord.msg, {
            extra: { level: testRecord.level, log_type: "test", extraParam: testRecord.extraParam },
            level: "info",
            tags: testRecord.tags
          })
        ).toEqual(true);
        expect(mockClient.captureException.notCalled).toEqual(true);
      });
    });
  });
});
