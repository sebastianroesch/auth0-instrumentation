import * as datadog from "datadog-metrics";
import { MetricsSettings } from "../../configuration/MetricsSettings";
import { MetricsProvider } from "./MetricsProvider";
import * as uuid from "uuid";

export class DatadogProvider extends MetricsProvider {
  public provider: datadog.BufferedMetricsLogger | any;

  constructor(configuration: MetricsSettings) {
    super(configuration);
  }

  public init(): void {
    this.provider = new datadog.BufferedMetricsLogger({
      apiKey: this.configuration.apiKey,
      host: this.configuration.metricsHost,
      prefix: this.configuration.metricsPrefix,
      flushIntervalSeconds: this.configuration.flushInterval
    });
  }

  public gauge(name: string, value: number, tags?: string[] | undefined, callback?: (() => void) | undefined): void {
    this.provider.gauge(name, value, this.getTags(tags));
    if (callback) {
      callback();
    }
  }

  public increment(name: string, valueOrTags?: number | string[], tags?: string[] | undefined, callback?: (() => void) | undefined): void {
    if (Array.isArray(valueOrTags)) {
      tags = valueOrTags;
      valueOrTags = 1;
    }

    this.provider.increment(name, valueOrTags || 1, this.getTags(tags));
    if (callback) {
      callback();
    }
  }

  public incrementOne(name: string, tags?: string[] | undefined, callback?: (() => void) | undefined): void {
    this.increment(name, 1, tags, callback);
  }

  public histogram(name: string, value: number, tags?: string[] | undefined, callback?: (() => void) | undefined): void {
    this.provider.histogram(name, value, this.getTags(tags));
    if (callback) {
      callback();
    }
  }

  public observeBucketed(name: string, value: number, buckets: number[], tags?: string[] | undefined, callback?: (() => void) | undefined): void {
    const allTags = this.getTags(tags);

    allTags.push("le:Inf");
    buckets.forEach((bucket) => {
      if (value <= bucket) {
        allTags.push(`le:${bucket}`);
      }
    });

    this.incrementOne(name, this.getTags(allTags), callback);
  }

  public flush(): void {
    this.provider.flush();
  }

  public startResourceCollection(tags?: string[] | undefined): void {
    throw new Error("Method not implemented.");
  }

  public time(name: string, tags?: string[] | undefined): string {
    const id = uuid.v4();
    this.increment(`${name}.started`, 1, tags);
    this.trackIds[id] = { date: Date.now(), metricName: name };
    return id;
  }

  public endTime(id: string, tags?: string[] | undefined): number | void {
    if (!this.trackIds[id]) {
      return;
    }

    const metricName = this.trackIds[id].metricName;
    const time = Date.now() - this.trackIds[id].date;

    delete this.trackIds[id];
    this.increment(`${metricName}.ended`, 1, tags);
    this.histogram(`${metricName}.time`, time, tags);
    return time;
  }
}
