/**
 * This is a temporary version of the tracer that accepts an
 * option to enable / disable it. Since tracing might be expensive
 * this feature is useful to enable / disable it if we note issues
 * or we need to save resources for some reason
 */

module.exports = function switchableTracer(options) {
  const baseTracer = options.baseTracer;
  const tracerStubs = options.tracerStubs;
  const isEnabled = options.isEnabled;
  const logger = options.logger;

  function isProtectedEnabled() {
    try {
      return isEnabled();
    } catch (err) {
      // Not much to do with the error but we don't want to fail, instead
      // we will assume it is disabled
      logger.error('Error determining if tracer is enabled, we will assume it is disabled.', {
        log_type: 'tracer_is_enabled_error',
        err
      });

      return false;
    }
  }

  return {
    baseTracer,
    tracerStubs,
    startSpan: (name, options) => {
      if (isProtectedEnabled()) {
        return baseTracer.startSpan(name, options);
      }

      return tracerStubs.startSpan(name, options);
    },
    inject: (spanContext, format, carrier) => {
      if (isProtectedEnabled()) {
        return baseTracer.inject(spanContext, format, carrier);
      }

      return tracerStubs.inject(spanContext, format, carrier);
    },
    extract: (format, carrier) => {
      if (isProtectedEnabled()) {
        return baseTracer.extract(format, carrier);
      }

      return tracerStubs.extract(format, carrier);
    },
    Tags: baseTracer.Tags
  };
};
