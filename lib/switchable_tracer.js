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

  function isProtectedEnabled() {
    try {
      return isEnabled();
    } catch (_) {
      // Not much to do with the error but we don't want
      // to fail; ideally we should log it but the logger might
      // not be initialized at this point
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
