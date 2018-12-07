const assert = require('chai').assert;
const sinon = require('sinon');
const MetricsAgent = require('../lib/metrics-agent');
const stubs = require('../lib/stubs').metrics;

describe('MetricsAgent', () => {
  /** @type {MetricsAgent} */
  var actual;
  var error;

  function getConfiguration() {
    return {
      type: 'test',
      metrics: {
        gauge: sinon.spy(),
        histogram: sinon.spy(),
        increment: sinon.spy(),
        flush: sinon.spy()
      },
      options: {
        collectResourceUsage: true,
        collectResourceInterval: 1
      }
    };
  }

  function before(config) {
    actual = new MetricsAgent(config.type, config.metrics, config.options);
  }

  describe('function', () => {
    function runTest(data, assertData, metric) {
      beforeEach(() => before(getConfiguration()));
      beforeEach(() =>
        actual[metric](
          data.metricName,
          data.value || data.tags,
          data.value ? data.tags : data.callback,
          data.callback
        )
      );
      it('should not throw type error', () => assert.isUndefined(error));
      it('should invoke method', () =>
        assert.isTrue(actual.metrics[metric].calledOnce));
      it('should invoke method with correct params', () =>
        assert.isTrue(
          actual.metrics[metric].calledWith(
            assertData.metricName,
            assertData.value,
            actual.getTags(data.tags),
            assertData.callback || stubs.callback
          )
        ));
    }

    describe('gauge', () => {
      const metricName = 'gauge';

      describe('without tags', () => {
        const data = { metricName: 'foo.bar', value: 14 };
        const assertData = { metricName: 'foo.bar', value: 14, tags: [] };

        runTest(data, assertData, metricName);
      });

      describe('with array as tags', () => {
        const data = {
          metricName: 'foo.bar',
          value: 14,
          tags: ['tag1:a', 'tag2:b']
        };
        const assertData = {
          metricName: 'foo.bar',
          value: 14,
          tags: ['tag1:a', 'tag2:b']
        };

        runTest(data, assertData, metricName);
      });

      describe('with object as tags', () => {
        const data = {
          metricName: 'foo.bar',
          value: 14,
          tags: { tag1: 'a', tag2: 'b' }
        };
        const assertData = {
          metricName: 'foo.bar',
          value: 14,
          tags: ['tag1:a', 'tag2:b']
        };

        runTest(data, assertData, metricName);
      });
    });

    describe('increment', () => {
      const metricName = 'increment';

      describe('without tags', () => {
        const data = { metricName: 'foo.bar', value: 14 };
        const assertData = { metricName: 'foo.bar', value: 14, tags: [] };

        runTest(data, assertData, metricName);
      });

      describe('with array as tags', () => {
        const data = {
          metricName: 'foo.bar',
          value: 14,
          tags: ['tag1:a', 'tag2:b']
        };
        const assertData = {
          metricName: 'foo.bar',
          value: 14,
          tags: ['tag1:a', 'tag2:b']
        };

        runTest(data, assertData, metricName);
      });

      describe('with object as tags', () => {
        const data = {
          metricName: 'foo.bar',
          value: 14,
          tags: { tag1: 'a', tag2: 'b' }
        };
        const assertData = {
          metricName: 'foo.bar',
          value: 14,
          tags: ['tag1:a', 'tag2:b']
        };

        runTest(data, assertData, metricName);
      });

      describe('without specifying value', () => {
        const data = {
          metricName: 'foo.bar',
          tags: { tag1: 'a', tag2: 'b' }
        };
        const assertData = {
          metricName: 'foo.bar',
          value: 1,
          tags: ['tag1:a', 'tag2:b']
        };

        runTest(data, assertData, metricName);
      });
    });
  });

  // describe('increment', () => {
  //   describe('without tags', () =>
  //     testMetric(
  //       () => actual.increment('foo.bar', 1),
  //       () => actual.metrics.increment
  //     ));
  //   describe('with array of tags', () =>
  //     testMetric(
  //       () => actual.increment('foo.bar', 1, ['tag1:a', 'tag2:b']),
  //       () => actual.metrics.increment
  //     ));
  //   describe('with object as tags', () =>
  //     testMetric(
  //       () => actual.increment('foo.bar', 1, { tag1: 'a', tag2: 'b' }),
  //       () => actual.metrics.increment
  //     ));

  //   describe('without value', () => {
  //     testMetric(
  //       () => actual.increment('foo.bar'),
  //       () => actual.metrics.increment
  //     );
  //     it('should use default value of 1', () =>
  //       assert.isTrue(actual.metrics.increment.calledWith('foo.bar', 1)));
  //   });
  //   testMetric(
  //     () => actual.increment('foo.bar', ['tag1:a', 'tag2:b']),
  //     () => actual.metrics.increment
  //   );
  //   testMetric(
  //     () => actual.increment('foo.bar', { tag1: 'a', tag2: 'b' }),
  //     () => actual.metrics.increment
  //   );
  // });

  it('should run increment without throwing', () =>
    assert.doesNotThrow(function() {}, TypeError));

  it('should track time without throwing', () =>
    assert.doesNotThrow(function() {
      var id = actual.time('foo.bar');
      assert.ok(id);
      actual.endTime(id);
      id = actual.time('foo.bar', ['tag1:a', 'tag2:b']);
      assert.ok(id);
      actual.endTime(id, ['tag1:a', 'tag2:b']);
      id = actual.time('foo.bar', { tag1: 'a', tag2: 'b' });
      actual.endTime(id, { tag1: 'a', tag2: 'b' });
      assert.ok(id);
    }, TypeError));

  it('should not do anything when running endTime alone', () =>
    assert.doesNotThrow(function() {
      actual.endTime('unkown');
    }, Error));

  it('should run histogram without throwing', () =>
    assert.doesNotThrow(function() {
      actual.gauge('foo.bar', 5.5);
      actual.gauge('foo.bar', 5.5, ['tag1:a', 'tag2:b']);
      actual.gauge('foo.bar', 5.5, { tag1: 'a', tag2: 'b' });
    }, TypeError));

  it('should run setDefaultTags without throwing', () =>
    assert.doesNotThrow(actual.setDefaultTags.bind(actual), TypeError));

  describe('incrementOne', function() {
    var metricsSpy;

    beforeEach(function() {
      metricsSpy = sinon.spy(actual, 'increment');
    });

    afterEach(function() {
      actual.increment.restore();
    });

    describe('when called with name', function() {
      it('should call metrics.increment with name and value 1', function() {
        actual.incrementOne('foobar', undefined);
        metricsSpy.calledWithMatch('foobar', 1, [], undefined);
      });
    });

    describe('when called with name and tags', function() {
      it('should call metrics.increment with name, tags and value 1', function() {
        actual.incrementOne('foobar', ['bar', 'foo']);
        metricsSpy.calledWithMatch('foobar', 1, ['bar', 'foo'], undefined);
      });
    });
  });

  describe('observeBucketed', function() {
    var metricsSpy;

    beforeEach(function() {
      metricsSpy = sinon.spy(actual, 'increment');
    });

    afterEach(function() {
      actual.increment.restore();
    });

    it('should assign tags based on buckets', function() {
      actual.observeBucketed('foobar', 34, [20, 50, 100], []);
      metricsSpy.calledWith(
        'foobar',
        1,
        sinon.match.array.contains(['le:50', 'le:100', 'le:Inf'])
      );
    });

    it('should always set the Inf tag', function() {
      actual.observeBucketed('foobar', 200, [20], []);
      metricsSpy.calledWith(
        'foobar',
        1,
        sinon.match.array.contains(['le:Inf'])
      );
    });

    it('should preserve existing tags', function() {
      actual.observeBucketed(
        'foobar',
        95,
        [20, 50, 100],
        ['tag1', 'tag2:val2']
      );
      metricsSpy.calledWith(
        'foobar',
        1,
        sinon.match.array.contains(['le:100', 'le:Inf', 'tag1', 'tag2:val2'])
      );
    });
  });

  describe('set default tags', () => {
    beforeEach(() => {
      before(getConfiguration());
      actual.setDefaultTags({ color: 'red', region: 'west' });
    });

    it('should set default tags', () =>
      assert.deepEqual(actual.defaultTags, ['color:red', 'region:west']));
  });

  describe('flush', () => {
    var spy;

    describe('for non datadog type', () => {
      beforeEach(() => {
        before(getConfiguration());
        actual.metrics.flush = sinon.spy();
        actual.flush();
      });
      it('should not invoke flush', () =>
        assert.isFalse(actual.metrics.flush.called));
    });

    describe('for datadog type', () => {
      beforeEach(() => {
        var config = getConfiguration();
        config.metrics.type = 'datadog';
        config.metrics.target = 'test';
        before(config);
        spy = sinon.spy(actual.metrics, 'flush');
        actual.flush();
      });
      it('should invoke flush', () => assert.isTrue(spy.called));
      afterEach(() => spy.restore());
    });
  });

  describe('start resource collection', () => {
    var spy;

    describe('with collection enabled', () => {
      beforeEach(() => {
        actual = require('../lib/metrics')();
        before(getConfiguration());
      });

      it('should retrieve memory usage', () =>
        assert.isTrue(spy.getMemoryUsage.calledOnce));
      it('should retrieve process stats', () =>
        assert.isTrue(spy.getProcessStats.calledOnce));
    });
  });
});
