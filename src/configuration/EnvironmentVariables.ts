import LogLevel from "./LogLevel";
import { TracingAgents } from "./TracingAgents";

export class EnvironmentVariables {
  // LOGGING
  public LOG_FILE?: string;
  public CONSOLE_LOG_LEVEL?: LogLevel;
  public LOG_LEVEL?: LogLevel;
  public CONSOLE_NICE_FORMAT?: boolean;

  // LOGGING - WEB URL
  public LOG_TO_WEB_URL?: string;
  public LOG_TO_WEB_LEVEL?: LogLevel;

  // LOGGING - SENTRY
  public ERROR_REPORTER_URL?: string;
  public ERROR_REPORTER_LOG_LEVEL?: LogLevel;

  // LOGGING - KINESIS
  public LOG_TO_KINESIS?: string;
  public LOG_TO_KINESIS_LEVEL?: LogLevel;
  public LOG_TO_KINESIS_LOG_TYPE?: string;
  public IGNORE_PROCESS_INFO?: boolean;

  // LOGGING - AWS
  public AWS_ACCESS_KEY_ID?: string;
  public AWS_ACCESS_KEY_SECRET?: string;
  public AWS_SESSION_TOKEN?: string;
  public AWS_CREDENTIALS?: string;
  public KINESIS_OBJECT_MODE?: string;
  public KINESIS_TIMEOUT?: number;
  public KINESIS_LENGTH?: number;
  public AWS_REGION?: string;
  public SERVICE_NAME?: string;
  public ENVIRONMENT?: string;
  public PURPOSE?: string;
  public RELEASE_CHANNEL?: string;

  // METRICS
  public STATSD_HOST?: string;
  public METRICS_PREFIX?: string;
  public METRICS_API_KEY?: string;
  public METRICS_HOST?: string;
  public METRICS_FLUSH_INTERVAL?: number;
  public METRICS_PKG_AS_SERVICE_NAME?: string;

  // RESOURCE COLLECTION
  public COLLECT_RESOURCE_USAGE?: boolean;
  public COLLECT_RESOURCE_USAGE_INTERVAL?: number;
  public HUNT_LONG_GC?: boolean;
  public HUNT_MEMORY_LEAKS?: boolean;
  public HEAPDUMP_DIR?: string;
  public PROFILE_GC?: boolean;

  // TRACING
  public TRACE_AGENT_CLIENT?: TracingAgents;
  public TRACE_AGENT_HOST?: string;
  public TRACE_AGENT_PORT?: number;
  public TRACE_AGENT_API_KEY?: string;
  public TRACE_AGENT_USE_TLS?: boolean;
  public TRACE_REPORTING_INTERVAL_MILLIS?: number;
}
