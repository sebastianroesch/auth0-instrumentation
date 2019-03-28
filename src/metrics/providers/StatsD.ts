import { MetricsProvider } from "./MetricsProvider";
import * as url from "url";
import { StatsD } from "node-statsd";
import uuid = require("uuid");

export class StatsDProvider extends MetricsProvider {
  public provider: StatsD | any;

  public init(): void {
    if (!this.configuration.statsdHost) {
      throw new Error("Unable to initialize StatsD. Missing parameter StatsD host.");
    }

    const parsedURL = url.parse(this.configuration.statsdHost);

    this.isActive = true;
    this.provider = new StatsD({
      host: parsedURL.hostname,
      port: Number(parsedURL.port),
      prefix: this.configuration.metricsPrefix,
      cacheDns: true
    });
  }

  public gauge(name: string, value: number, tags?: string[] | undefined, callback?: (() => void) | undefined): void {
    this.provider.gauge(name, value, this.getTags(tags), callback);
  }

  public increment(name: string, valueOrTags: number | string[] = 1, tags?: string[] | undefined, callback?: (() => void) | undefined): void {
    if (Array.isArray(valueOrTags)) {
      tags = valueOrTags;
      valueOrTags = 1;
    }

    this.provider.increment(name, valueOrTags, this.getTags(tags), callback);
  }

  public incrementOne(name: string, tags?: string[] | undefined, callback?: (() => void) | undefined): void {
    this.increment(name, 1, tags, callback);
  }

  public histogram(name: string, value: number, tags?: string[] | undefined, callback?: (() => void) | undefined): void {
    this.provider.histogram(name, value, this.getTags(tags), callback);
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
    // StatsD doesn't need to flush metrics
    return;
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
