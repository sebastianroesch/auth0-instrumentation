import { EnvironmentVariables } from "./EnvironmentVariables";
import * as os from "os";
import { ResourceSettings } from "./ResourceSettings";

export class MetricsSettings {
  public statsdHost?: string;
  public metricsPrefix?: string;
  public apiKey?: string;
  public metricsHost?: string;
  public flushInterval?: number;
  public packageAsServiceName?: string;
  public resourceSettings: ResourceSettings;
  constructor(env: EnvironmentVariables, pkg: { name: string }) {
    this.statsdHost = env.STATSD_HOST;
    this.metricsPrefix = env.METRICS_PREFIX || pkg.name + ".";
    this.apiKey = env.METRICS_API_KEY;
    this.metricsHost = env.METRICS_HOST || os.hostname();
    this.flushInterval = env.METRICS_FLUSH_INTERVAL || 15;
    this.packageAsServiceName = env.METRICS_PKG_AS_SERVICE_NAME;
    this.resourceSettings = new ResourceSettings(env);
  }
}
