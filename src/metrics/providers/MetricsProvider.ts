import { noop } from "../../Stubs";
import * as blocked from "blocked";
import * as events from "events";
import { MetricsSettings } from "src/configuration/MetricsSettings";

export abstract class MetricsProvider {
  public isActive: boolean;
  protected trackIds: {};
  protected defaultTags: string[];
  protected callback = noop;
  protected collectResourceUsage: boolean | undefined;
  protected reportInterval: number | undefined;
  protected eventEmitter: events.EventEmitter;
  protected configuration: MetricsSettings;

  constructor(configuration: MetricsSettings) {
    this.isActive = true;
    this.defaultTags = [];
    this.configuration = configuration;
    this.collectResourceUsage = configuration.resourceSettings.collectUsage;
    this.reportInterval = configuration.resourceSettings.reportInterval;
  }

  public setDefaultTags(tags: string[] | {}) {
    this.defaultTags = this.processTags(tags);
  }

  public startResourceCollection(tags?: string[] | {} | {}) {
    if (!this.collectResourceUsage) {
      return;
    }

    tags = tags || {};

    setInterval(() => {
      const memoryUsage = process.memoryUsage();
      const cpuUsage = process.cpuUsage();

      this.gauge("resources.memory.heapTotal", memoryUsage.heapTotal, tags); // refer to V8's memory usage
      this.gauge("resources.memory.heapUsed", memoryUsage.heapUsed, tags); // refer to V8's memory usage
      this.gauge("resources.memory.rss", memoryUsage.rss); // Resident Set Size, is the amount of space occupied in the main memory device
      this.gauge("resources.memory.external", memoryUsage.external); // refers to the memory usage of C++ objects bound to JavaScript objects managed by V8
      this.gauge("resources.cpu.user", cpuUsage.user, tags);
      this.gauge("resources.cpu.system", cpuUsage.system, tags);
    }, this.reportInterval);

    // Collect Event Loop Blocked - Emit event to notify about event loop blocked
    blocked((ms) => {
      this.histogram("event_loop.blocked", ms, tags);
    });
  }

  public abstract init(): void;
  public abstract gauge(name: string, value: number, tags?: string[] | {}, callback?: () => void): void;
  public abstract increment(name: string, valueOrTags?: number | string[], tags?: string[] | {}, callback?: () => void): void;
  public abstract incrementOne(name: string, tags?: string[] | {}, callback?: () => void): void;
  public abstract histogram(name: string, value: number, tags?: string[] | {}, callback?: () => void): void;
  public abstract observeBucketed(name: string, value: number, buckets: number[], tags?: string[] | {}, callback?: () => void): void;
  public abstract flush(): void;
  public abstract time(name: string, tags?: string[] | {}): string;
  public abstract endTime(id: string, tags?: string[] | {}): void;

  protected getTags(tags): any[] {
    return this.defaultTags.concat(this.processTags(tags));
  }

  protected processTags(tags: string[] | {}): string[] {
    if (Array.isArray(tags)) {
      return tags;
    } else if (typeof tags === "object") {
      const processedTags: string[] = [];

      Object.keys(tags).forEach((key) => {
        processedTags.push(`${key}:${tags[key]}`);
      });

      tags = processedTags;
    }

    return (tags as string[]) || [];
  }
}
