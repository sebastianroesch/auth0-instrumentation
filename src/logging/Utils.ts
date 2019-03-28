import bunyan = require("bunyan");
import { DecoratedBunyan } from "./DecoratedBunyan";

export function decorateLogger(logger: bunyan): DecoratedBunyan {
  const createChildLoggerFactory = (parentLogger: bunyan) => {
    return function child(childOptions, simple) {
      return exports.decorateLogger(parentLogger.child(childOptions, simple));
    };
  };
  const createLogFormatter = (parentLogger: bunyan, lvl: string) => {
    return function formatLog() {
      const args = Array.from(arguments);
      if (typeof args[0] === "string" && typeof args[1] !== "string") {
        const swap = args[0];
        args[0] = args[1] || {};
        args[1] = swap;
      }
      return parentLogger[lvl].apply(parentLogger, args);
    };
  };

  const decoratedBunyan = new DecoratedBunyan();
  decoratedBunyan.child = createChildLoggerFactory(logger);
  decoratedBunyan.trace = createLogFormatter(logger, "trace");
  decoratedBunyan.debug = createLogFormatter(logger, "debug");
  decoratedBunyan.info = createLogFormatter(logger, "info");
  decoratedBunyan.warn = createLogFormatter(logger, "warn");
  decoratedBunyan.error = createLogFormatter(logger, "error");
  decoratedBunyan.fatal = createLogFormatter(logger, "fatal");
  decoratedBunyan.reopenFileStreams = () => {
    if (!logger || !logger.reopenFileStreams) {
      return;
    }
    logger.reopenFileStreams();
  };

  return decoratedBunyan;
}
