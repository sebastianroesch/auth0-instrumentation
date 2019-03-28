// tslint:disable-next-line: no-empty
export const noop = () => {};
const emptyMiddleware = (a, b, next) => {
  if (next) {
    next();
  }
};

export const emptyErrorReporter = {
  isActive: false,
  captureException: noop,
  captureMessage: noop,
  patchGlobal: noop,
  hapi: {
    plugin: {
      register: emptyMiddleware,
      pkg: require("../package.json")
    }
  },
  express: {
    requestHandler: emptyMiddleware,
    errorHandler: emptyMiddleware
  }
};
