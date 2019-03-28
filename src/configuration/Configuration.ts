import { EnvironmentVariables } from "./EnvironmentVariables";
import { AWSSettings } from "./AWSSettings";
import { LoggingSettings } from "./LoggingSettings";
import { MetricsSettings } from "./MetricsSettings";
import { TracingSettings } from "./TracingSettings";

export default class Configuration {
  public aws: AWSSettings;
  public logging: LoggingSettings;
  public metrics: MetricsSettings;
  public tracing: TracingSettings;

  constructor(env: EnvironmentVariables, pkg: { name: string }) {
    this.aws = new AWSSettings(env);
    this.logging = new LoggingSettings(env);
    this.metrics = new MetricsSettings(env, pkg);
    this.tracing = new TracingSettings(env);
  }
}
