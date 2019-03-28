export interface IMetricsProvider {
  isActive: boolean;
  gauge: () => {};
  increment: () => {};
  incrementOne: () => {};
  histogram: () => {};
  flush: () => {};
  setDefaultTags: () => {};
  startResourceCollection: () => {};
  time: () => {};
  endTime: () => {};
  callback: () => {};
}
