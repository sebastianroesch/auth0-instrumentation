import * as sinon from "sinon";
import { StatsDProvider as Provider } from "src/metrics/providers/StatsD";

describe("StatsD Provider", () => {
  let actual: Provider;

  describe("constructor", () => {
    it("should create set the provider as enabled", () => {
      actual = new Provider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });

      expect(actual.isActive).toEqual(true);
    });
  });

  describe("initialization", () => {
    it("should create a Datadog provider", () => {
      actual = new Provider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });

      actual.init();
    });
  });

  describe("gauge", () => {
    it("should save the gauge value", () => {
      const providerMock = { gauge: sinon.spy() };
      actual = new Provider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });

      actual.provider = providerMock;
      actual.gauge("test", 250);
      expect(providerMock.gauge.calledOnce).toEqual(true);
      expect(providerMock.gauge.calledWith("test", 250, [])).toEqual(true);
    });

    it("should use tags", () => {
      const providerMock = { gauge: sinon.spy() };
      actual = new Provider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });

      actual.provider = providerMock;
      actual.gauge("test", 250, ["test:value"]);
      expect(providerMock.gauge.calledOnce).toEqual(true);
      expect(providerMock.gauge.calledWith("test", 250, ["test:value"])).toEqual(true);
    });

    it("should call the callback function", () => {
      const providerMock = { gauge: sinon.spy() };
      const callback = sinon.spy();
      actual = new Provider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });

      actual.provider = providerMock;
      actual.gauge("test", 250, ["test:value"], callback);
      expect(providerMock.gauge.calledOnce).toEqual(true);
      expect(providerMock.gauge.calledWith("test", 250, ["test:value"], callback)).toEqual(true);
    });
  });

  describe("increment", () => {
    it("should save the value", () => {
      const providerMock = { increment: sinon.spy() };
      actual = new Provider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });

      actual.provider = providerMock;
      actual.increment("test", 250);
      expect(providerMock.increment.calledOnce).toEqual(true);
      expect(providerMock.increment.calledWith("test", 250, [])).toEqual(true);
    });

    it("should assume value is 1 if not specified", () => {
      const providerMock = { increment: sinon.spy() };
      actual = new Provider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });

      actual.provider = providerMock;
      actual.increment("test");
      expect(providerMock.increment.calledOnce).toEqual(true);
      expect(providerMock.increment.calledWith("test", 1, [])).toEqual(true);
    });

    it("should assume value is 1 if an Array is specified", () => {
      const providerMock = { increment: sinon.spy() };
      actual = new Provider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });

      actual.provider = providerMock;
      actual.increment("test", ["test:value"]);
      expect(providerMock.increment.calledOnce).toEqual(true);
      expect(providerMock.increment.calledWith("test", 1, ["test:value"])).toEqual(true);
    });

    it("should use tags", () => {
      const providerMock = { increment: sinon.spy() };
      actual = new Provider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });

      actual.provider = providerMock;
      actual.increment("test", 250, ["test:value"]);
      expect(providerMock.increment.calledOnce).toEqual(true);
      expect(providerMock.increment.calledWith("test", 250, ["test:value"])).toEqual(true);
    });

    it("should call the callback function", () => {
      const providerMock = { increment: sinon.spy() };
      const callback = sinon.spy();
      actual = new Provider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });

      actual.provider = providerMock;
      actual.increment("test", 250, ["test:value"], callback);
      expect(providerMock.increment.calledOnce).toEqual(true);
      expect(providerMock.increment.calledWith("test", 250, ["test:value"], callback)).toEqual(true);
    });
  });

  describe("incrementOne", () => {
    it("should save the value 1", () => {
      const providerMock = { increment: sinon.spy() };
      actual = new Provider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });

      actual.provider = providerMock;
      actual.incrementOne("test");
      expect(providerMock.increment.calledOnce).toEqual(true);
      expect(providerMock.increment.calledWith("test", 1, [])).toEqual(true);
    });

    it("should use tags", () => {
      const providerMock = { increment: sinon.spy() };
      actual = new Provider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });

      actual.provider = providerMock;
      actual.incrementOne("test", ["test:value"]);
      expect(providerMock.increment.calledOnce).toEqual(true);
      expect(providerMock.increment.calledWith("test", 1, ["test:value"])).toEqual(true);
    });

    it("should call the callback function", () => {
      const providerMock = { increment: sinon.spy() };
      const callback = sinon.spy();
      actual = new Provider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });

      actual.provider = providerMock;
      actual.incrementOne("test", ["test:value"], callback);
      expect(providerMock.increment.calledOnce).toEqual(true);
      expect(providerMock.increment.calledWith("test", 1, ["test:value"], callback)).toEqual(true);
    });
  });

  describe("histogram", () => {
    it("should save the histogram value", () => {
      const providerMock = { histogram: sinon.spy() };
      actual = new Provider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });

      actual.provider = providerMock;
      actual.histogram("test", 250);
      expect(providerMock.histogram.calledOnce).toEqual(true);
      expect(providerMock.histogram.calledWith("test", 250, [])).toEqual(true);
    });

    it("should use tags", () => {
      const providerMock = { histogram: sinon.spy() };
      actual = new Provider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });

      actual.provider = providerMock;
      actual.histogram("test", 250, ["test:value"]);
      expect(providerMock.histogram.calledOnce).toEqual(true);
      expect(providerMock.histogram.calledWith("test", 250, ["test:value"])).toEqual(true);
    });

    it("should call the callback function", () => {
      const providerMock = { histogram: sinon.spy() };
      const callback = sinon.spy();
      actual = new Provider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });

      actual.provider = providerMock;
      actual.histogram("test", 250, ["test:value"], callback);
      expect(providerMock.histogram.calledOnce).toEqual(true);
      expect(providerMock.histogram.calledWith("test", 250, ["test:value"], callback)).toEqual(true);
    });
  });

  describe("observeBucketed", () => {
    it("should save the value in the correct bucket", () => {
      const providerMock = { increment: sinon.spy() };
      actual = new Provider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });

      actual.provider = providerMock;
      actual.observeBucketed("test", 250, [100, 200, 300, 400]);
      expect(providerMock.increment.calledOnce).toEqual(true);
      expect(providerMock.increment.calledWith("test", 1, ["le:Inf", "le:300", "le:400"], undefined)).toEqual(true);
    });

    it("should use tags", () => {
      const providerMock = { increment: sinon.spy() };
      actual = new Provider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });

      actual.provider = providerMock;
      actual.observeBucketed("test", 250, [100, 200, 300, 400], ["test:value"]);
      expect(providerMock.increment.calledOnce).toEqual(true);
      expect(providerMock.increment.calledWith("test", 1, ["test:value", "le:Inf", "le:300", "le:400"], undefined)).toEqual(true);
    });

    it("should call the callback function", () => {
      const providerMock = { increment: sinon.spy() };
      const callback = sinon.spy();

      actual = new Provider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });
      actual.provider = providerMock;
      actual.observeBucketed("test", 250, [100, 200, 300, 400], ["test:value"], callback);
      expect(providerMock.increment.calledOnce).toEqual(true);
      expect(providerMock.increment.calledWith("test", 1, ["test:value", "le:Inf", "le:300", "le:400"], callback)).toEqual(true);
    });
  });
});
