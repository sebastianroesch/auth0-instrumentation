"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon = require("sinon");
var StatsD_1 = require("src/metrics/providers/StatsD");
describe("StatsD Provider", function () {
    var actual;
    describe("constructor", function () {
        it("should create set the provider as enabled", function () {
            actual = new StatsD_1.StatsDProvider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });
            expect(actual.isActive).toEqual(true);
        });
    });
    describe("initialization", function () {
        it("should create a Datadog provider", function () {
            actual = new StatsD_1.StatsDProvider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });
            actual.init();
        });
    });
    describe("gauge", function () {
        it("should save the gauge value", function () {
            var providerMock = { gauge: sinon.spy() };
            actual = new StatsD_1.StatsDProvider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });
            actual.provider = providerMock;
            actual.gauge("test", 250);
            expect(providerMock.gauge.calledOnce).toEqual(true);
            expect(providerMock.gauge.calledWith("test", 250, [])).toEqual(true);
        });
        it("should use tags", function () {
            var providerMock = { gauge: sinon.spy() };
            actual = new StatsD_1.StatsDProvider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });
            actual.provider = providerMock;
            actual.gauge("test", 250, ["test:value"]);
            expect(providerMock.gauge.calledOnce).toEqual(true);
            expect(providerMock.gauge.calledWith("test", 250, ["test:value"])).toEqual(true);
        });
        it("should call the callback function", function () {
            var providerMock = { gauge: sinon.spy() };
            var callback = sinon.spy();
            actual = new StatsD_1.StatsDProvider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });
            actual.provider = providerMock;
            actual.gauge("test", 250, ["test:value"], callback);
            expect(providerMock.gauge.calledOnce).toEqual(true);
            expect(providerMock.gauge.calledWith("test", 250, ["test:value"], callback)).toEqual(true);
        });
    });
    describe("increment", function () {
        it("should save the value", function () {
            var providerMock = { increment: sinon.spy() };
            actual = new StatsD_1.StatsDProvider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });
            actual.provider = providerMock;
            actual.increment("test", 250);
            expect(providerMock.increment.calledOnce).toEqual(true);
            expect(providerMock.increment.calledWith("test", 250, [])).toEqual(true);
        });
        it("should assume value is 1 if not specified", function () {
            var providerMock = { increment: sinon.spy() };
            actual = new StatsD_1.StatsDProvider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });
            actual.provider = providerMock;
            actual.increment("test");
            expect(providerMock.increment.calledOnce).toEqual(true);
            expect(providerMock.increment.calledWith("test", 1, [])).toEqual(true);
        });
        it("should assume value is 1 if an Array is specified", function () {
            var providerMock = { increment: sinon.spy() };
            actual = new StatsD_1.StatsDProvider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });
            actual.provider = providerMock;
            actual.increment("test", ["test:value"]);
            expect(providerMock.increment.calledOnce).toEqual(true);
            expect(providerMock.increment.calledWith("test", 1, ["test:value"])).toEqual(true);
        });
        it("should use tags", function () {
            var providerMock = { increment: sinon.spy() };
            actual = new StatsD_1.StatsDProvider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });
            actual.provider = providerMock;
            actual.increment("test", 250, ["test:value"]);
            expect(providerMock.increment.calledOnce).toEqual(true);
            expect(providerMock.increment.calledWith("test", 250, ["test:value"])).toEqual(true);
        });
        it("should call the callback function", function () {
            var providerMock = { increment: sinon.spy() };
            var callback = sinon.spy();
            actual = new StatsD_1.StatsDProvider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });
            actual.provider = providerMock;
            actual.increment("test", 250, ["test:value"], callback);
            expect(providerMock.increment.calledOnce).toEqual(true);
            expect(providerMock.increment.calledWith("test", 250, ["test:value"], callback)).toEqual(true);
        });
    });
    describe("incrementOne", function () {
        it("should save the value 1", function () {
            var providerMock = { increment: sinon.spy() };
            actual = new StatsD_1.StatsDProvider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });
            actual.provider = providerMock;
            actual.incrementOne("test");
            expect(providerMock.increment.calledOnce).toEqual(true);
            expect(providerMock.increment.calledWith("test", 1, [])).toEqual(true);
        });
        it("should use tags", function () {
            var providerMock = { increment: sinon.spy() };
            actual = new StatsD_1.StatsDProvider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });
            actual.provider = providerMock;
            actual.incrementOne("test", ["test:value"]);
            expect(providerMock.increment.calledOnce).toEqual(true);
            expect(providerMock.increment.calledWith("test", 1, ["test:value"])).toEqual(true);
        });
        it("should call the callback function", function () {
            var providerMock = { increment: sinon.spy() };
            var callback = sinon.spy();
            actual = new StatsD_1.StatsDProvider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });
            actual.provider = providerMock;
            actual.incrementOne("test", ["test:value"], callback);
            expect(providerMock.increment.calledOnce).toEqual(true);
            expect(providerMock.increment.calledWith("test", 1, ["test:value"], callback)).toEqual(true);
        });
    });
    describe("histogram", function () {
        it("should save the histogram value", function () {
            var providerMock = { histogram: sinon.spy() };
            actual = new StatsD_1.StatsDProvider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });
            actual.provider = providerMock;
            actual.histogram("test", 250);
            expect(providerMock.histogram.calledOnce).toEqual(true);
            expect(providerMock.histogram.calledWith("test", 250, [])).toEqual(true);
        });
        it("should use tags", function () {
            var providerMock = { histogram: sinon.spy() };
            actual = new StatsD_1.StatsDProvider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });
            actual.provider = providerMock;
            actual.histogram("test", 250, ["test:value"]);
            expect(providerMock.histogram.calledOnce).toEqual(true);
            expect(providerMock.histogram.calledWith("test", 250, ["test:value"])).toEqual(true);
        });
        it("should call the callback function", function () {
            var providerMock = { histogram: sinon.spy() };
            var callback = sinon.spy();
            actual = new StatsD_1.StatsDProvider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });
            actual.provider = providerMock;
            actual.histogram("test", 250, ["test:value"], callback);
            expect(providerMock.histogram.calledOnce).toEqual(true);
            expect(providerMock.histogram.calledWith("test", 250, ["test:value"], callback)).toEqual(true);
        });
    });
    describe("observeBucketed", function () {
        it("should save the value in the correct bucket", function () {
            var providerMock = { increment: sinon.spy() };
            actual = new StatsD_1.StatsDProvider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });
            actual.provider = providerMock;
            actual.observeBucketed("test", 250, [100, 200, 300, 400]);
            expect(providerMock.increment.calledOnce).toEqual(true);
            expect(providerMock.increment.calledWith("test", 1, ["le:Inf", "le:300", "le:400"], undefined)).toEqual(true);
        });
        it("should use tags", function () {
            var providerMock = { increment: sinon.spy() };
            actual = new StatsD_1.StatsDProvider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });
            actual.provider = providerMock;
            actual.observeBucketed("test", 250, [100, 200, 300, 400], ["test:value"]);
            expect(providerMock.increment.calledOnce).toEqual(true);
            expect(providerMock.increment.calledWith("test", 1, ["test:value", "le:Inf", "le:300", "le:400"], undefined)).toEqual(true);
        });
        it("should call the callback function", function () {
            var providerMock = { increment: sinon.spy() };
            var callback = sinon.spy();
            actual = new StatsD_1.StatsDProvider({ resourceSettings: { collectUsage: false }, statsdHost: "statsd://test", metricsHost: "test", metricsPrefix: "test" });
            actual.provider = providerMock;
            actual.observeBucketed("test", 250, [100, 200, 300, 400], ["test:value"], callback);
            expect(providerMock.increment.calledOnce).toEqual(true);
            expect(providerMock.increment.calledWith("test", 1, ["test:value", "le:Inf", "le:300", "le:400"], callback)).toEqual(true);
        });
    });
});
